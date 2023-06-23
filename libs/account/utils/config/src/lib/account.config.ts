import {z} from 'zod';
import {ConfigType, registerAs} from "@nestjs/config";
import {Inject} from "@nestjs/common";

const accountConfigType = z.object({
  RABBITMQ_USER: z.ostring(),
  RABBITMQ_PWD: z.ostring(),
  RABBITMQ_HOST: z.ostring(),
  RABBITMQ_PORT: z.ostring()
});

accountConfigType.parse(process.env);

export const accountConfig = registerAs('accountConfig', () => ({
  rabbitmq: {
    user: process.env.RABBITMQ_USER || 'user',
    pwd: process.env.RABBITMQ_PWD || 'bitnami',
    host: process.env.RABBITMQ_HOST || 'localhost',
    port: process.env.RABBITMQ_PORT || '5672',
    get url() {
      return `amqp://${this.user}:${this.pwd}@${this.host}:${this.port}`;
    }
  }
}));

export type AccountConfig = ConfigType<typeof accountConfig>;

export const InjectAccountConfig = () => Inject(accountConfig.KEY);


declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof accountConfigType> {
    }
  }
}
