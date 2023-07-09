import {Logger, Module, OnModuleInit} from '@nestjs/common';
import {PrismaService} from "./prisma.service";
import {ACCOUNT_REPOSITORY} from "@all-in-one/account/utils/tokens";
import {AccountRepository} from "./account.repository";

@Module({
  controllers: [],
  providers: [PrismaService, {
    provide: ACCOUNT_REPOSITORY,
    useClass: AccountRepository
  }],
  exports: [PrismaService, ACCOUNT_REPOSITORY],
})
export class AccountDatabaseModule {}
