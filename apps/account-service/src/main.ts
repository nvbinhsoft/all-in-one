/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import {Logger} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';

import {AppModule} from './app/app.module';
import {MicroserviceOptions, Transport} from "@nestjs/microservices";
import {RabbitmqConfig, rabbitmqConfig} from "@all-in-one/account/utils/config";

async function bootstrap() {

  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'debug', 'log', 'verbose']
  });

  const accountConfigService = app.get<RabbitmqConfig>(rabbitmqConfig.KEY);

  app.connectMicroservice<MicroserviceOptions>( {
    transport: Transport.RMQ,
    options: {
      urls: [accountConfigService.rabbitmq.url],
      queue: 'account_queue',
      queueOptions: {
        durable: false
      },
    }
  });

  await app.startAllMicroservices();
  Logger.log('Account service is running');

}

bootstrap();
