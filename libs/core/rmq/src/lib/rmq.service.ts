import { Injectable } from "@nestjs/common";
import { InjectRmqConfig, RmqConfig } from "@all-in-one/core/config";
import { RmqContext, RmqOptions, Transport } from "@nestjs/microservices";

@Injectable()
export class RmqService {
  constructor(@InjectRmqConfig() private rmqConfig: RmqConfig) {}

  /**
   * This function will get all the config by environment variables
   * and create the options for the RMQ connection
   * @param noAck
   */
  getOptions(noAck = false): RmqOptions {
    return {
      transport: Transport.RMQ,
      options: {
        urls: [this.rmqConfig.rmq.uri],
        queue: RmqService.getRmqQueue(this.rmqConfig.rmq.queue),
        noAck,
        persistent: true,
      },
    };
  }

  ack(context: RmqContext): void {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    channel.ack(originalMessage);
  }

  static getRmqQueue(queueName: string) {
    return `RMQ_QUEUE_${queueName}`;
  }
}
