import {AggregateRoot} from "@all-in-one/core/ddd";
import {AccountProps, SignupProps} from "./account.types";
import {v4} from "uuid";
import {AccountCreatedDomainEvent} from "./events/account-created.domain-event";

export class AccountEntity extends AggregateRoot<AccountProps> {

  static create(userProps: SignupProps): AccountEntity {
    const id = v4();
    const props: AccountProps = {
      ...userProps,
      hash: ""
    }

    const account = new AccountEntity({id, props});

    account.addEvent(new AccountCreatedDomainEvent({
      aggregateId: id,
      email: props.email.unpack().value
    }))

    return account;
  }





}
