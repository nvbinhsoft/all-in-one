import { Module } from "@nestjs/common";
import { SignInService } from "./sign-in.service";
import { SignInMessageController } from "./sign-in.message.controller";
import { SignInHttpController } from "./sign-in.http.controller";
import { CqrsModule } from "@nestjs/cqrs";
import { AccountDatabaseModule } from "@all-in-one/account/database";
import { JwtModule } from "@nestjs/jwt";
import { RequestContextModule } from "@all-in-one/core/middleware/request-context";
import { EventEmitterModule } from "@nestjs/event-emitter";

@Module({
  controllers: [SignInMessageController, SignInHttpController],
  providers: [SignInService],
  imports: [CqrsModule, AccountDatabaseModule, JwtModule, RequestContextModule],
})
export class SignInCommandModule {}
