import { Inject, Injectable, Logger } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { SignInCommand } from "./sign-in.command";
import { None, Ok, Result } from "oxide.ts";
import { AggregateId } from "@all-in-one/core/ddd";
import {
  AccountEntity,
  Email,
  ExpiresIn,
  InvalidUsernamePasswordException,
  Jwt,
  JwtSecret,
  LoginTokens,
  Password,
} from "@all-in-one/account/domain";
import { PrismaClient } from "@prisma/client";
import { ACCOUNT_REPOSITORY } from "@all-in-one/account/utils/tokens";
import { AccountRepositoryPort } from "@all-in-one/account/database";
import { AuthConfig, InjectAuthConfig } from "@all-in-one/account/utils/config";
import { JwtService } from "@nestjs/jwt";
import { EventEmitter2 } from "@nestjs/event-emitter";

@CommandHandler(SignInCommand)
export class SignInService implements ICommandHandler<SignInCommand> {
  constructor(
    @Inject(ACCOUNT_REPOSITORY) private accountRepository: AccountRepositoryPort,
    @InjectAuthConfig() private authConfig: AuthConfig,
    @Inject(JwtService) private jwtService: JwtService,
    @Inject(EventEmitter2) private eventEmitter: EventEmitter2
  ) {}

  async execute(
    command: SignInCommand
  ): Promise<Result<LoginTokens, InvalidUsernamePasswordException>> {
    const account = await this.accountRepository.findOneByEmail(command.email);

    const result = await AccountEntity.signIn(
      {
        email: new Email({ value: command.email }),
        password: new Password({ value: command.password }),
        accessTokenProps: new Jwt({
          secret: this.authConfig.at_jwt_secret,
          expiresIn: Number(this.authConfig.at_jwt_expires_in),
        }),
        refreshTokenProps: new Jwt({
          secret: this.authConfig.rt_jwt_secret,
          expiresIn: Number(this.authConfig.rt_jwt_expires_in),
        }),
        hashService: this.jwtService,
      },
      account,
      new Logger(SignInService.name),
      this.eventEmitter
    );

    return result;
  }
}
