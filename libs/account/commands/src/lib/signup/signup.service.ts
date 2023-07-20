import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { SignupCommand } from "./signup.command";
import {
  AccountAlreadyExistsException,
  AccountEntity,
  Email,
  ExpiresIn,
  JwtSecret,
  Password,
  SaltRound,
} from "@all-in-one/account/domain";
import { ConflictException, Inject, Logger } from "@nestjs/common";
import { ACCOUNT_REPOSITORY } from "@all-in-one/account/utils/tokens";
import { AccountRepositoryPort } from "@all-in-one/account/database";
import { Err, Ok, Result } from "oxide.ts";
import { AggregateId } from "@all-in-one/core/ddd";
import { PrismaClient } from "@prisma/client";
import { JwtService } from "@nestjs/jwt";
import { AuthConfig, InjectAuthConfig } from "@all-in-one/account/utils/config";
import { EventEmitter2 } from "@nestjs/event-emitter";

@CommandHandler(SignupCommand)
export class SignupService implements ICommandHandler<SignupCommand> {
  constructor(
    @Inject(ACCOUNT_REPOSITORY)
    private accountRepository: AccountRepositoryPort,
    @Inject(PrismaClient) private prismaClient: PrismaClient,
    @Inject(JwtService) private jwtService: JwtService,
    @InjectAuthConfig() private authConfig: AuthConfig,

    @Inject(EventEmitter2) private eventEmitter: EventEmitter2
  ) {}

  /**
   * In the signup command, we will stop at creating account and return their id
   * By following this approach, we can separate the signup process and the login process
   * This will make the code more readable and easier to maintain
   * @param command
   */
  async execute(
    command: SignupCommand
  ): Promise<Result<AggregateId, AccountAlreadyExistsException>> {
    const account = await AccountEntity.create({
      email: new Email({ value: command.email }),
      password: new Password({ value: command.password }),
      saltRound: new SaltRound({ value: Number(this.authConfig.jwt_salt) }),
    });

    try {
      await this.prismaClient.$transaction(async () => {
        await this.accountRepository.insert(account);
      });

      await account.publishEvents(new Logger(SignupService.name), this.eventEmitter);

      return Ok(account.id);
    } catch (e: unknown) {
      if (e instanceof ConflictException) {
        return Err(new AccountAlreadyExistsException(e));
      }

      throw e;
    }
  }
}
