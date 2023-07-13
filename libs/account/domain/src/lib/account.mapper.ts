import { AccountEntity } from "./account.entity";
import { Mapper } from "@all-in-one/core/ddd";
import { Account } from "@prisma/client";
import { Email } from "./value-objects";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AccountMapper implements Mapper<AccountEntity, Account, unknown> {
  toDomain(record: Account): AccountEntity {
    return new AccountEntity({
      id: record.id,
      createdAt: new Date(record.createdAt),
      updatedAt: new Date(record.updatedAt),
      props: {
        email: new Email({ value: record.email }),
        hash: record.hash,
      },
    });
  }

  toPersistence(entity: AccountEntity): Account {
    const copy = entity.unpack();

    const record: Account = {
      id: copy.id,
      createdAt: copy.createdAt || new Date(),
      updatedAt: copy.updatedAt || new Date(),
      email: copy.email,
      hash: copy.hash,
    };

    return record;
  }

  toResponse(entity: AccountEntity): unknown {
    return undefined;
  }
}
