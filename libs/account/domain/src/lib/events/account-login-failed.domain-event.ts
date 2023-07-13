import { DomainEvent, DomainEventProps } from "@all-in-one/core/ddd";

export class AccountLoginFailedDomainEvent extends DomainEvent {
  readonly email: string;

  constructor(props: DomainEventProps<AccountLoginFailedDomainEvent>) {
    super(props);

    this.email = props.email;
  }
}
