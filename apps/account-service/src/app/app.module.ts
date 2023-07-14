import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AccountConfigModule } from "./account-config.module";
import { AccountCommandsModule } from "@all-in-one/account/commands";
import { RequestContextModule } from "nestjs-request-context";
import { ContextInterceptor, RequestContextService } from "@all-in-one/core/application";
import { APP_INTERCEPTOR } from "@nestjs/core";

const interceptors = [
  {
    provide: APP_INTERCEPTOR,
    useClass: ContextInterceptor,
  },
];

@Module({
  imports: [AccountConfigModule, AccountCommandsModule, RequestContextModule],
  controllers: [AppController],
  providers: [AppService, RequestContextService, ...interceptors],
})
export class AppModule {}
