import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  Inject,
  Post,
} from "@nestjs/common";
import { ApiErrorResponse, IdResponse } from "@all-in-one/core/api";
import { SignInRequestDto } from "./sign-in.request.dto";
import { CommandBus } from "@nestjs/cqrs";
import { SignInCommand } from "./sign-in.command";
import { SignInResponseDto } from "./sign-in.response.dto";
import { match, Result } from "oxide.ts";
import {
  InvalidUsernamePasswordException,
  LoginTokens,
} from "@all-in-one/account/domain";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

@Controller("v1")
export class SignInHttpController {
  constructor(@Inject() private commandBus: CommandBus) {}

  /**
   * Normally, a command handler should return nothing,
   * but in this case,
   * we need to return the tokens to the user for the sake of simplicity.
   * @param body
   */
  @ApiOperation({ summary: "Sign in" })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SignInResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  @Post("account/sign-in")
  async signIn(@Body() body: SignInRequestDto): Promise<SignInResponseDto> {
    const command = new SignInCommand(body);

    const result: Result<LoginTokens, InvalidUsernamePasswordException> =
      await this.commandBus.execute(command);

    return match(result, {
      Ok: ([accessToken, refreshToken]: LoginTokens) =>
        new SignInResponseDto(accessToken, refreshToken),
      Err: (error: Error) => {
        if (error instanceof InvalidUsernamePasswordException) {
          throw new BadRequestException(error.message, error.code);
        }
        throw error;
      },
    });
  }
}
