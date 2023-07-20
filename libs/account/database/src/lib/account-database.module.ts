import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { ACCOUNT_REPOSITORY } from "@all-in-one/account/utils/tokens";
import { AccountRepository } from "./account.repository";
import { PrismaClient } from "@prisma/client";
import { AccountMapper } from "@all-in-one/account/domain";

@Module({
  controllers: [],
  providers: [
    PrismaService,
    {
      provide: ACCOUNT_REPOSITORY,
      useClass: AccountRepository,
    },
    PrismaClient,
    AccountMapper,
  ],
  exports: [PrismaService, PrismaClient, ACCOUNT_REPOSITORY],
})
export class AccountDatabaseModule {}
