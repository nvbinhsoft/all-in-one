import { AggregateRoot } from "@all-in-one/core/ddd";
import { AccountProps, GenerateTokenProps, SignupProps } from "./account.types";
import { v4 } from "uuid";
import { AccountCreatedDomainEvent } from "./events/account-created.domain-event";

import * as bcrypt from "bcrypt";
import { ExpiresIn } from "./value-objects/expires-in.value-object";
import { JwtService } from "@nestjs/jwt";
export class AccountEntity extends AggregateRoot<AccountProps> {
  static async create(userProps: SignupProps): Promise<AccountEntity> {
    const id = v4();

    const props: AccountProps = {
      ...userProps,
      // hash the password
      hash: userProps.password.hash(),
    };

    const account = new AccountEntity({ id, props });

    /**
     * Add domain event and we will publish it later
     */
    account.addEvent(
      new AccountCreatedDomainEvent({
        aggregateId: id,
        email: props.email.unpack(),
      })
    );

    return account;
  }

  /**
   * The payload of the jwt token will be defined by entity
   * The developer can pass 2 different secret to generate 2 different jwt token
   * @param secret: jwt secret
   */
  async generateToken(props: GenerateTokenProps): Promise<string> {
    const account = this.unpack();
    return await props.hashService.signAsync(
      { sub: account.id, ...account },
      { secret: props.secret.unpack(), expiresIn: props.expiresIn.unpack() }
    );
  }
}
