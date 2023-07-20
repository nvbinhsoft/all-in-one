import { DomainEvent, DomainEventProps } from "@all-in-one/core/ddd";

/**
 * The account login failed event occurs when the user tries to login with invalid password
 */
export class AccountLoginFailedDomainEvent extends DomainEvent {
  readonly email: string;

  constructor(props: DomainEventProps<AccountLoginFailedDomainEvent>) {
    super(props);

    this.email = props.email;
  }
}
