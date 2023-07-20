import { DynamicModule, Inject, Module } from "@nestjs/common";
import { RmqService } from "./rmq.service";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { InjectRmqConfig, rmqConfig, RmqConfig } from "@all-in-one/core/config";
import { ConfigService } from "@nestjs/config";

interface RmqModuleOptions {
  name: string;
}
@Module({
  providers: [RmqService],
  exports: [RmqService],
})
export class CoreRmqModule {
  static register({ name }: RmqModuleOptions): DynamicModule {
    return {
      module: CoreRmqModule,
      imports: [
        ClientsModule.registerAsync([
          {
            name,
            useFactory: (rmqConfig: RmqConfig) => ({
              transport: Transport.RMQ,
              options: {
                urls: [rmqConfig.rmq.uri],
                queue: RmqService.getRmqQueue(rmqConfig.rmq.queue),
              },
            }),
            inject: [InjectRmqConfig],
          },
        ]),
      ],
      exports: [ClientsModule],
    };
  }
}
