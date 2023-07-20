import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { appConfig, authConfig } from "@all-in-one/account/utils/config";
import { databaseConfig, rmqConfig } from "@all-in-one/core/config";
import { CoreRmqModule } from "@all-in-one/core/rmq";

@Module({
  imports: [
    CoreRmqModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [rmqConfig, databaseConfig, authConfig, appConfig],
    }),
  ],
})
export class AccountConfigModule {}
