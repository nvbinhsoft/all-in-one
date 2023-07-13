import { AggregateId, AggregateRoot } from "@all-in-one/core/ddd";
import {
  AccountProps,
  GenerateTokenProps,
  SignInProps,
  SignupProps,
} from "./account.types";
import { v4 } from "uuid";
import { AccountCreatedDomainEvent } from "./events/account-created.domain-event";
import { Err, Ok, Option, Result } from "oxide.ts";
import { HashPort } from "./ports";
import { InvalidUsernamePasswordException } from "./account.errors";

export type LoginTokens = [accessToken: string, refreshToken: string];

export class AccountEntity extends AggregateRoot<AccountProps> {
  static async create(userProps: SignupProps): Promise<AccountEntity> {
    const id = v4();

    const props: AccountProps = {
      email: userProps.email,
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

  static async signIn(
    props: SignInProps,
    account: Option<AccountEntity>
  ): Promise<Result<LoginTokens, InvalidUsernamePasswordException>> {
    // validate to check if account is exist
    if (account.isNone()) {
      return Err(new InvalidUsernamePasswordException());
    }

    const accountEntity = account.unwrap();

    // validate to check if email is correct
    if (!accountEntity.props.email.equals(props.email)) {
      return Err(new InvalidUsernamePasswordException());
    }

    // validate to check if password is correct
    if (!props.password.compare(accountEntity.props.hash)) {
      return Err(new InvalidUsernamePasswordException());
    }

    const [accessToken, refreshToken] = await Promise.all([
      accountEntity.generateToken({
        hashService: props.hashService,
        jwt: props.accessToken,
      }),
      accountEntity.generateToken({
        hashService: props.hashService,
        jwt: props.refreshToken,
      }),
    ]);
    return Ok([accessToken, refreshToken]);
  }

  /**
   * The payload of the jwt token will be defined by entity
   * The developer can pass 2 different secret to generate 2 different jwt token
   * @param secret: jwt secret
   */
  private async generateToken(props: GenerateTokenProps): Promise<string> {
    const account = this.unpack();
    return await props.hashService.signAsync(
      { sub: account.id, ...account },
      { secret: props.jwt.unpack().secret, expiresIn: props.jwt.unpack().expiresIn }
    );
  }
}
