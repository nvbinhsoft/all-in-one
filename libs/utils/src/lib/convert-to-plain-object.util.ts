import {ValueObject} from "@all-in-one/core/ddd";
import {isEntity} from "./is-entity.util";

export function convertToPlainObject(item: unknown) {
  if (ValueObject.isValueObject(item)) {
    return item.unpack();
  }

  if(isEntity(item)) {
    return item.toObject();
  }

  return item;
}
