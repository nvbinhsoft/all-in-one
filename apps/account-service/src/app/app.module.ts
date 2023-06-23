import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {AccountConfigModule} from "./account-config.module";

@Module({
  imports: [AccountConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
