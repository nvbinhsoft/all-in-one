import { AccountRepositoryPort } from "./account.repository.port";
import { AccountEntity, AccountMapper } from "@all-in-one/account/domain";
import { Paginated, PaginatedQueryParams } from "@all-in-one/core/ddd";
import { None, Option, Some } from "oxide.ts";
import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";

@Injectable()
export class AccountRepository implements AccountRepositoryPort {
  constructor(
    @Inject(PrismaService) private prismaService: PrismaService,
    @Inject(AccountMapper) private accountMapper: AccountMapper
  ) {}

  delete(entity: AccountEntity): Promise<boolean> {
    return Promise.resolve(false);
  }

  findAll(): Promise<AccountEntity[]> {
    return Promise.resolve([]);
  }

  findAllPaginated(params: PaginatedQueryParams): Promise<Paginated<AccountEntity>> {
    const paginate = new Paginated<AccountEntity>({
      data: [],
      count: 0,
      limit: params.limit,
      page: params.page,
    });

    return Promise.resolve(paginate);
  }

  async findOneByEmail(email: string): Promise<Option<AccountEntity>> {
    const result = await this.prismaService.account.findUnique({
      where: {
        email: email,
      },
    });
    return result ? Some(this.accountMapper.toDomain(result)) : None;
  }

  async findOneById(id: string): Promise<Option<AccountEntity>> {
    this.prismaService.account
      .findUniqueOrThrow({
        where: {
          id: id,
        },
      })
      .then();

    return None;

    // return Promise.resolve(undefined);
  }

  async insert(entity: AccountEntity): Promise<void> {
    await this.prismaService.account.create({
      data: {
        ...entity.unpack(),
      },
    });
  }
}
