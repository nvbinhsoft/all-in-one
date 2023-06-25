import {Logger, Module, OnModuleInit} from '@nestjs/common';
import {PrismaService} from "./prisma.service";

@Module({
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AccountDatabaseModule {}
