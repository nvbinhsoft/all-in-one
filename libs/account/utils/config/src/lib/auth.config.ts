import {z} from 'zod';
import {ConfigType, registerAs} from "@nestjs/config";
import {Inject} from "@nestjs/common";

const authConfigType = z.object({
  PASSWORD_SALT: z.ostring()
});

authConfigType.parse(process.env);

export const authConfig = registerAs('authConfig', () => ({
  url: process.env.ACCOUNT_DATABASE_URL
}));

export type DatabaseConfig = ConfigType<typeof authConfig>;

export const InjectDatabaseConfig = () => Inject(authConfig.KEY);


declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface ProcessEnv extends z.infer<typeof authConfigType> {
    }
  }
}
