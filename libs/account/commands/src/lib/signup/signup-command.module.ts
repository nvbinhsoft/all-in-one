import {Module} from "@nestjs/common";
import {SignupHttpController} from "./signup.http.controller";
import {CqrsModule} from "@nestjs/cqrs";

@Module({
  controllers: [SignupHttpController],
  imports: [CqrsModule],
  exports: [],
  providers: []
})
export class SignupCommandModule {

}
