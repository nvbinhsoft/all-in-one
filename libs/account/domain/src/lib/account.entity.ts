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
import { AccountLoginFailedDomainEvent } from "./events/account-login-failed.domain-event";
import { LoggerPort } from "@all-in-one/core/port";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { AccountLoginSuccessDomainEvent } from "./events/account-login-success.domain-event";

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

    // Add domain event and we will publish it later
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
    account: Option<AccountEntity>,
    logger: LoggerPort,
    eventEmitter: EventEmitter2
  ): Promise<Result<LoginTokens, InvalidUsernamePasswordException>> {
    if (account.isNone()) {
      return Err(new InvalidUsernamePasswordException());
    }

    const accountEntity = account.unwrap();

    if (!accountEntity.props.email.equals(props.email)) {
      return Err(new InvalidUsernamePasswordException());
    }

    if (!props.password.compare(accountEntity.props.hash)) {
      await this.publishSignInEvent(false, accountEntity, logger, eventEmitter);
      return Err(new InvalidUsernamePasswordException());
    }

    const [accessToken, refreshToken] = await Promise.all([
      accountEntity.generateToken({
        hashService: props.hashService,
        jwt: props.accessTokenProps,
      }),
      accountEntity.generateToken({
        hashService: props.hashService,
        jwt: props.refreshTokenProps,
      }),
    ]);

    await this.publishSignInEvent(true, accountEntity, logger, eventEmitter);
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

  static async publishSignInEvent(
    isSuccess: boolean,
    account: AccountEntity,
    logger: LoggerPort,
    eventEmitter: EventEmitter2
  ) {
    if (isSuccess) {
      account.addEvent(
        new AccountLoginSuccessDomainEvent({
          aggregateId: account.id,
          email: account.props.email.unpack(),
        })
      );
    } else {
      account.addEvent(
        new AccountLoginFailedDomainEvent({
          aggregateId: account.id,
          email: account.props.email.unpack(),
        })
      );
    }

    await account.publishEvents(logger, eventEmitter);
  }
}
