import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { RequestContextMiddleware } from "./request-context.middleware";

@Module({
  controllers: [],
  providers: [RequestContextMiddleware],
  exports: [RequestContextMiddleware],
})
export class RequestContextModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(RequestContextMiddleware).forRoutes("*");
  }
}
