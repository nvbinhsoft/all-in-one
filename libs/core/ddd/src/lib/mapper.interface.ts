import { Entity } from "./entity.base";

/**
 * Mapper constructs objects that are used in different layers:
 * Record is an object that is stored in a database,
 * Entity is an object that is used in application domain layer,
 * and a ResponseDTO is an object returned to a user (usually as json).
 */
export interface Mapper<
  DomainEntity extends Entity<unknown>,
  DbRecord,
  Response = unknown
> {
  toPersistence(entity: DomainEntity): DbRecord;

  // convert from database record to domain entity
  toDomain(record: DbRecord): DomainEntity;

  toResponse(entity: DomainEntity): Response;
}
