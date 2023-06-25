import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {AccountConfigModule} from "./account-config.module";
import {AccountDatabaseModule} from "@all-in-one/account/database";

@Module({
  imports: [AccountConfigModule, AccountDatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}
