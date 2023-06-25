import {Controller, Inject} from "@nestjs/common";
import {CommandBus} from "@nestjs/cqrs";

@Controller('v1')
export class SignupHttpController {

  constructor(@Inject(CommandBus) private readonly commandBus: CommandBus) {}

  async signup() {

  }


}
