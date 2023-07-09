import {AggregateRoot} from "@all-in-one/core/ddd";
import {AccountProps, SignupProps} from "./account.types";
import {v4} from "uuid";
import {AccountCreatedDomainEvent} from "./events/account-created.domain-event";

import * as bcrypt from 'bcrypt';
export class AccountEntity extends AggregateRoot<AccountProps> {

  static async create(userProps: SignupProps): Promise<AccountEntity> {
    const id = v4();

    const props: AccountProps = {
      ...userProps,
      // hash the password
      hash: userProps.password.hash()
    }

    const account = new AccountEntity({id, props});

    /**
     * Add domain event and we will publish it later
     */
    account.addEvent(new AccountCreatedDomainEvent({
      aggregateId: id,
      email: props.email.unpack()
    }))

    return account;
  }


}
