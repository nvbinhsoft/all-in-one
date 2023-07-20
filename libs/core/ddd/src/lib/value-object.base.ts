import { EmptyGuard } from "@all-in-one/core/guard";
import { ArgumentNotProvidedException } from "@all-in-one/core/exceptions";

export type Primitives = string | number | boolean;

export interface DomainPrimitive<T extends Primitives> {
  value: T;
}

type ValueObjectProps<T> = T extends Primitives ? DomainPrimitive<T> : T;

type CompareValueObject<T> = T extends Primitives
  ? DomainPrimitive<T> | ValueObject<T>
  : ValueObject<T>;

// unpacked type for value object
type Unpacked<T> = T extends object
  ? {
      [K in keyof T]: T[K] extends infer U
        ? U extends ValueObject<infer V>
          ? Unpacked<V>
          : U
        : never;
    }
  : T;

export abstract class ValueObject<T> {
  protected readonly props: ValueObjectProps<T>;

  constructor(props: ValueObjectProps<T>) {
    this.checkIfEmpty(props);
    this.validate(props);
    this.props = props;
  }

  static isValueObject(obj: unknown): obj is ValueObject<unknown> {
    return obj instanceof ValueObject;
  }

  protected abstract validate(props: ValueObjectProps<T>): void;

  private checkIfEmpty(props: ValueObjectProps<T>): void {
    if (
      EmptyGuard(props as unknown as object) ||
      (this.isDomainPrimitive(props) && EmptyGuard(props.value))
    ) {
      throw new ArgumentNotProvidedException("Property cannot be empty");
    }
  }

  private isDomainPrimitive(obj: unknown): obj is DomainPrimitive<T & Primitives> {
    if (Object.prototype.hasOwnProperty.call(obj, "value")) {
      return true;
    }

    return false;
  }

  /**
   * Check if two Value Objects are equal. Checks structural equality.
   * @param vo ValueObject
   */
  public equals(vo?: CompareValueObject<T>): boolean {
    if (vo === null || vo === undefined) {
      return false;
    }

    if (
      this.isDomainPrimitive(this.props) &&
      ["string", "number", "boolean"].includes(typeof vo)
    ) {
      return this.props.value === vo;
    }

    return JSON.stringify(this) === JSON.stringify(vo);
  }

  public unpack(): Readonly<Unpacked<T>> {
    if (this.isDomainPrimitive(this.props)) {
      return this.props.value as Unpacked<T>;
    }

    const propsCopy = { ...this.props };

    for (const propKey in propsCopy) {
      const prop = propsCopy[propKey];

      if (Array.isArray(prop)) {
        propsCopy[propKey] = prop.map((item) => {
          return this.unpackProp(item);
        }) as any;
      } else {
        propsCopy[propKey] = this.unpackProp(prop) as any;
      }
    }

    return Object.freeze(propsCopy as Unpacked<T>);
  }

  private unpackProp(prop: unknown): unknown {
    if (prop instanceof ValueObject) {
      return prop.unpack();
    }

    return prop;
  }
}
