import { Module } from "@nestjs/common";
import { SignupCommandModule } from "./signup/signup-command.module";
import { SignInCommandModule } from "./sign-in/sign-in-command.module";

@Module({
  controllers: [],
  providers: [],
  imports: [SignupCommandModule, SignInCommandModule],
  exports: [],
})
export class AccountCommandsModule {}
