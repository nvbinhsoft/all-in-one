import { z } from "zod";
import { ConfigType, registerAs } from "@nestjs/config";
import { Inject } from "@nestjs/common";

const appConfigType = z.object({
  PORT: z.string(),
});

appConfigType.parse(process.env);

export const appConfig = registerAs("appConfig", () => ({
  port: process.env.PORT,
}));

export type AppConfig = ConfigType<typeof appConfig>;

export const InjectAppConfig = () => Inject(appConfig.KEY);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface ProcessEnv extends z.infer<typeof appConfigType> {}
  }
}
