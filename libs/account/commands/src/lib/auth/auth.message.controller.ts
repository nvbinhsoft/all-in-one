import {Controller} from "@nestjs/common";
import {CommandBus} from "@nestjs/cqrs";
import {MessagePattern} from "@nestjs/microservices";


@Controller()
export class AuthMessageController {

  constructor(private readonly commandBus: CommandBus) {}

  // @MessagePattern('account.auth')
  // async

}
