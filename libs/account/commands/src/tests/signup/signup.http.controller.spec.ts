import { Test, TestingModule } from "@nestjs/testing";
import { SignupHttpController } from "../../lib/signup/signup.http.controller";
import { CqrsModule } from "@nestjs/cqrs";
import { RequestContextModule } from "nestjs-request-context";
import { AccountDatabaseModule } from "@all-in-one/account/database";
import { ConfigModule } from "@nestjs/config";
import {
  authConfig,
  databaseConfig,
  rabbitmqConfig,
} from "@all-in-one/account/utils/config";

describe("signupHttpController", () => {
  let app: TestingModule;

  let signupController: SignupHttpController;
  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [SignupHttpController],
      providers: [],
      imports: [
        CqrsModule,
        RequestContextModule,
        AccountDatabaseModule,
        ConfigModule.forRoot({
          isGlobal: true,
          load: [rabbitmqConfig, databaseConfig, authConfig],
        }),
      ],
    }).compile();

    signupController = app.get<SignupHttpController>(SignupHttpController);
  });

  it("should init", () => {
    expect(app).toBeDefined();
  });

  it("should create user successfully and return id", async () => {
    // add test here
    const result = await signupController.signup({
      email: "test@gmail.com",
      password: "test",
    });

    expect(result).toBeDefined();
    expect(result.id).toBeDefined();
  });

  afterAll(async () => {
    // todo: clear database after test
  });
});
