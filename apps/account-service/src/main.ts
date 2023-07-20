/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app/app.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { appConfig, AppConfig } from "@all-in-one/account/utils/config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { RmqService } from "@all-in-one/core/rmq";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ["error", "warn", "debug", "log", "verbose"],
  });

  const globalPrefix = "api";

  // pipe
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  // config swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle("Account service")
    .setDescription("The account service API description")
    .setVersion("1.0")
    .addTag("account")
    .build();
  const swaggerPath = `${globalPrefix}/docs`;
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(swaggerPath, app, swaggerDocument);

  // config rabbitmq & microservice
  // const accountConfigService = app.get<RabbitmqConfig>(rmqConfig.KEY);

  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice<MicroserviceOptions>(rmqService.getOptions());
  // bootstrapping
  app.enableShutdownHooks();

  await app.startAllMicroservices();
  Logger.log("Account service is running");

  const appConfigService = app.get<AppConfig>(appConfig.KEY);
  await app.listen(appConfigService.port, () => {
    Logger.log(
      `Account service is listening on port ${appConfigService.port},
      try http://localhost:${appConfigService.port}/${globalPrefix}.
      API docs is running on http://localhost:${appConfigService.port}/${swaggerPath}`
    );
  });
}

bootstrap();
