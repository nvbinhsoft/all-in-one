import { Module } from "@nestjs/common";
import { SignupCommandModule } from "./signup/signup-command.module";
import { SignInCommandModule } from "./sign-in/sign-in-command.module";
import { EventEmitterModule } from "@nestjs/event-emitter";

@Module({
  controllers: [],
  providers: [],
  imports: [SignupCommandModule, SignInCommandModule, EventEmitterModule.forRoot()],
  exports: [],
})
export class AccountCommandsModule {}
