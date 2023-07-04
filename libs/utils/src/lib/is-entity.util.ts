import {Entity, ValueObject} from "@all-in-one/core/ddd";

export function isEntity(object: unknown): object is Entity<unknown> {
  return (
    Object.prototype.hasOwnProperty.call(object, 'toObject') &&
    Object.prototype.hasOwnProperty.call(object, 'id') &&
    ValueObject.isValueObject((object as Entity<unknown>).id)
  )
}
