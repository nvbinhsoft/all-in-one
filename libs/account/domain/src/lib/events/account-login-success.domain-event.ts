import { DomainEvent, DomainEventProps } from "@all-in-one/core/ddd";

export class AccountLoginSuccessDomainEvent extends DomainEvent {
  readonly email: string;

  constructor(props: DomainEventProps<AccountLoginSuccessDomainEvent>) {
    super(props);

    this.email = props.email;
  }
}
