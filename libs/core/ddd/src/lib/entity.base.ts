import {convertPropsToObject} from "@all-in-one/utils";

export type AggregateId = string;

export interface BaseEntityProps {
  id: AggregateId;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateEntityProps<T> {
  id: AggregateId;
  props: T;
  createdAt?: Date;

  updatedAt?: Date;
}

export abstract class Entity<EntityProps = unknown> {
  constructor({
    id,
    createdAt,
    updatedAt,
    props,
  }: CreateEntityProps<EntityProps>) {

    this._id = id;
    // this.validateProps(props);
    const now = new Date();
    this._createdAt = createdAt || now;
    this._updatedAt = updatedAt || now;
    this.props = props;
    // this.validate();
  }

  protected readonly props: EntityProps;

  /**
   * ID is set in the concrete entity implementation to support
   * different ID types depending on your needs.
   * For example it could be a UUID for aggregate root,
   * and shortid / nanoid for child entities.
   */

  protected _id: AggregateId;

  private readonly _createdAt: Date;

  private _updatedAt: Date;

  get id(): AggregateId {
    return this._id;
  }

  private setId(id: AggregateId): void {
    this._id = id;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  static isEntity<T>(entity: unknown): entity is Entity<T> {
    return entity instanceof Entity;
  }

  /**
   * Check if two entities are equal by comparing their ids.
   * If entity is not an instance of Entity, return false.
   * If entity is null or undefined, return false.
   * If entity is the current entity, return true.
   * Otherwise, return the result of comparing the ids.
   * @param object
   */
  public equals(object?: Entity<EntityProps>): boolean {
    if (object == null || object == undefined) {
      return false;
    }
    if (this === object) {
      return true;
    }
    if (!Entity.isEntity<EntityProps>(object)) {
      return false;
    }

    return this.id === object.id;
  }

  /**
   * Returns a copy of the entity props.
   * Makes sure that the props are immutable.
   * If a reference to a specific property is needed, create a getter in parent class
   * @returns {*} {Props & EntityProps}
   * @memberof Entity
   */
  public getPropsCopy(): EntityProps {
    const propsCopy = {
      id: this._id,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      ...this.props,
    }

    return Object.freeze(propsCopy);
  }

  /**
   * Convert an entity and all sub-entities/Value Objects to a plain object
   * with primitive values.
   *
   * Can be useful for serialization purposes (e.g. sending data over network).
   * Or logging, testing, debugging.
   */
  public toObject(): unknown {

    const plainProps = convertPropsToObject(this.props);
    const result = {
      id: this._id,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      ...plainProps,

    }
    return Object.freeze(result);
  }

}
