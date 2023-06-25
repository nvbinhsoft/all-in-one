import {Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import {databaseConfig, rabbitmqConfig} from "@all-in-one/account/utils/config";

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: [rabbitmqConfig, databaseConfig]
  })]
})
export class AccountConfigModule {

}
