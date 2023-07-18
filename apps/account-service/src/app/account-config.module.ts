import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import {
  appConfig,
  authConfig,
  databaseConfig,
  rabbitmqConfig,
} from "@all-in-one/account/utils/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [rabbitmqConfig, databaseConfig, authConfig, appConfig],
    }),
  ],
})
export class AccountConfigModule {}
