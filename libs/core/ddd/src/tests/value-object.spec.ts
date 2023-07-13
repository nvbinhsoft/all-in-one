// write unit test for the value-object.base.ts with 100% coverage

import { DomainPrimitive, ValueObject } from "../lib/value-object.base";
import { AppRequestContext, RequestContextService } from "@all-in-one/core/application";
import { ArgumentNotProvidedException } from "@all-in-one/core/exceptions";

describe("ValueObject", () => {
  let requestContextService: RequestContextService;
  const mockStaticMethod = jest.fn();

  beforeEach(() => {
    RequestContextService.getContext = mockStaticMethod;
    mockStaticMethod.mockReturnValue({
      requestId: "test",
    });
  });

  it("should throw an error if props are empty", () => {
    expect(() => {
      const testValueObject: DomainPrimitive<string> = {
        value: "",
      };

      class TestValueObject extends ValueObject<string> {
        protected validate(props: DomainPrimitive<string>): void {
          return;
        }
      }
      new TestValueObject(testValueObject);
    }).toThrowError(ArgumentNotProvidedException);
  });

  // test the unpack function
  it("should unpack the domain primitive", () => {
    const testValueObject: DomainPrimitive<string> = {
      value: "test",
    };

    class TestValueObject extends ValueObject<string> {
      protected validate(props: DomainPrimitive<string>): void {
        return;
      }
    }
    const valueObject = new TestValueObject(testValueObject);
    expect(valueObject.unpack()).toEqual("test");
  });

  // add test for non-primitive value object
  it("should unpack the non-primitive value object", () => {
    type TestValueObjectProps = {
      name: string;
      email: string;
    };
    const testValueObject: TestValueObjectProps = {
      name: "test",
      email: "hello@gmail.com",
    };

    class TestValueObject extends ValueObject<TestValueObjectProps> {
      protected validate(props: TestValueObjectProps): void {
        return;
      }
    }

    const valueObject = new TestValueObject(testValueObject);
    expect(valueObject.unpack()).toEqual(testValueObject);
  });

  // add test for nested value object
  it("should unpack the nested value object", () => {
    const testDomainPrimitive: DomainPrimitive<string> = {
      value: "test",
    };

    class TestDomainPrimitive extends ValueObject<string> {
      protected validate(props: DomainPrimitive<string>): void {
        return;
      }
    }

    type TestValueObjectProps = {
      name: TestDomainPrimitive;
      email: string;
    };
    const testValueObject: TestValueObjectProps = {
      name: new TestDomainPrimitive({ value: "test" }),
      email: "hello@gmail.com",
    };

    class TestValueObject extends ValueObject<TestValueObjectProps> {
      protected validate(props: TestValueObjectProps): void {
        return;
      }
    }

    const valueObject = new TestValueObject(testValueObject);
    expect(valueObject.unpack()).toEqual({
      name: "test",
      email: "hello@gmail.com",
    });
  });
});
