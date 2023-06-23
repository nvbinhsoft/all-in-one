import {Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import {accountConfig} from "@all-in-one/account/utils/config";

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: [accountConfig]
  })]
})
export class AccountConfigModule {

}
