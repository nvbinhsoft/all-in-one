import { Body, Controller, Post } from "@nestjs/common";
import { IdResponse } from "@all-in-one/core/api";
import { SignInRequestDto } from "./sign-in.request.dto";

@Controller("v1")
export class SignInHttpController {
  @Post("account/sign-in")
  async signIn(@Body() body: SignInRequestDto): Promise<IdResponse> {
    return new IdResponse("1");
  }
}
