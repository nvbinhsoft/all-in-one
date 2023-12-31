import { Module } from "@nestjs/common";
import { SignupHttpController } from "./signup.http.controller";
import { CqrsModule } from "@nestjs/cqrs";
import { SignupService } from "./signup.service";
import { AccountDatabaseModule } from "@all-in-one/account/database";
import { JwtModule } from "@nestjs/jwt";
import { RequestContextModule } from "@all-in-one/core/middleware/request-context";
import { EventEmitterModule } from "@nestjs/event-emitter";

@Module({
  controllers: [SignupHttpController],
  imports: [CqrsModule, AccountDatabaseModule, JwtModule, RequestContextModule],
  exports: [],
  providers: [],
})
export class SignupCommandModule {}
