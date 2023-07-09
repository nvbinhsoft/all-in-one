import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {SignupCommand} from "./signup.command";
import {AccountAlreadyExistsException, AccountEntity, Email, Password} from "@all-in-one/account/domain";
import {ConflictException, Inject} from "@nestjs/common";
import {ACCOUNT_REPOSITORY} from "@all-in-one/account/utils/tokens";
import {AccountRepositoryPort} from "@all-in-one/account/database";
import {Err, Ok, Result} from "oxide.ts";
import {AggregateId} from "@all-in-one/core/ddd";

@CommandHandler(SignupCommand)
export class SignupService implements ICommandHandler {

  constructor(@Inject(ACCOUNT_REPOSITORY) private accountRepository: AccountRepositoryPort) {
  }

  async execute(command: SignupCommand): Promise<Result<AggregateId, AccountAlreadyExistsException>> {
    const account = await AccountEntity.create({
      email: new Email({value: command.email}),
      password: new Password({value: command.password})
    });


    try {
      await this.accountRepository.insert(account);
      return Ok(account.id);
    }catch (e: unknown){
      if(e instanceof ConflictException){
        return Err(new AccountAlreadyExistsException(e));
      }

      throw e;
    }

  }


}
