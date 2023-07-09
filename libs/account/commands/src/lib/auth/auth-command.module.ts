import {Module} from "@nestjs/common";
import {JwtModule} from "@nestjs/jwt";
@Module({
  controllers: [],
  imports: [JwtModule.register({

  })]
})
export class AuthCommandModule {

}
