import {Controller} from "@nestjs/common";
import {MessagePattern} from "@nestjs/microservices";
import {SignRequestDto} from "./sign.command";

@Controller()
export class SignMessageController {

  @MessagePattern('account.sign')
  async sign(message: SignRequestDto) {

  }

}
