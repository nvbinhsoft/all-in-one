import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {SignupCommand} from "./signup.command";
import {AccountEntity, Email, Password} from "@all-in-one/account/domain";

@CommandHandler(SignupCommand)
export class SignupService implements ICommandHandler {


  execute(command: any): Promise<any> {
    const account = AccountEntity.create({
      email: new Email(command.email),
      password: new Password(command.password)
    })


    return Promise.resolve(account.id);

  }


}
