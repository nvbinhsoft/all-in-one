/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import {Logger} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';

import {AppModule} from './app/app.module';
import {MicroserviceOptions, Transport} from "@nestjs/microservices";

async function bootstrap() {

  const user = 'user'
  const pwd = 'bitnami'
  const host = 'localhost';
  const port = 5672;

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${user}:${pwd}@${host}:${port}`],
      queue: 'account_queue',
      queueOptions: {
        durable: false
      },
    }
  });
  await app.listen();
  Logger.log(
    `🚀 Application is running`
  );
}

bootstrap();
