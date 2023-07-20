import { z } from "zod";
import { ConfigType, registerAs } from "@nestjs/config";
import { Inject } from "@nestjs/common";

const rmqConfigType = z.object({
  RMQ_URI: z.string(),
  RMQ_QUEUE: z.string(),
});

rmqConfigType.parse(process.env);

export const rmqConfig = registerAs("rmqConfig", () => ({
  rmq: {
    uri: process.env.RMQ_URI,
    queue: process.env.RMQ_QUEUE,
  },
}));

export type RmqConfig = ConfigType<typeof rmqConfig>;

export const InjectRmqConfig = () => Inject(rmqConfig.KEY);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface ProcessEnv extends z.infer<typeof rmqConfigType> {}
  }
}
