import { BadRequestException, ConflictException, Controller } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { SignInRequestDto } from "./sign-in.request.dto";
import { IdResponse } from "@all-in-one/core/api";
import { SignInCommand } from "./sign-in.command";
import { MessagePattern } from "@nestjs/microservices";
import { SignInResponseDto } from "./sign-in.response.dto";
import { match, Result } from "oxide.ts";
import {
  AccountAlreadyExistsException,
  InvalidUsernamePasswordException,
  LoginTokens,
} from "@all-in-one/account/domain";

@Controller()
export class SignInMessageController {
  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern("user.sign-in")
  async create(message: SignInRequestDto): Promise<SignInResponseDto> {
    const command = new SignInCommand(message);

    const result: Result<LoginTokens, InvalidUsernamePasswordException> =
      await this.commandBus.execute(command);

    const [accessToken, refreshToken] = result.unwrap();
    return new SignInResponseDto(accessToken, refreshToken);
  }
}
