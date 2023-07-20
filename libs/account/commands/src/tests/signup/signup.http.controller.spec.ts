import { Test, TestingModule } from "@nestjs/testing";
import { SignupHttpController } from "../../lib/signup/signup.http.controller";
import { CommandBus, CqrsModule } from "@nestjs/cqrs";
import { RequestContextModule } from "nestjs-request-context";
import { AccountDatabaseModule } from "@all-in-one/account/database";
import { ConfigModule } from "@nestjs/config";
import { authConfig } from "@all-in-one/account/utils/config";
import { RequestContextService } from "@all-in-one/core/application";
import { Ok } from "oxide.ts";

describe("signupHttpController", () => {
  let app: TestingModule;
  const mockStaticMethod = jest.fn();
  const commandBusService = {
    execute: jest.fn(),
  };
  let signupController: SignupHttpController;

  beforeAll(async () => {
    jest.spyOn(commandBusService, "execute").mockImplementation(() => {
      return Ok("test-id");
    });

    app = await Test.createTestingModule({
      controllers: [SignupHttpController],
      providers: [
        {
          provide: CommandBus,
          useValue: commandBusService,
        },
      ],
      imports: [
        RequestContextModule,
        CqrsModule,
        AccountDatabaseModule,
        ConfigModule.forRoot({
          isGlobal: true,
          load: [authConfig],
        }),
      ],
    }).compile();

    signupController = app.get<SignupHttpController>(SignupHttpController);
  });

  beforeEach(() => {
    RequestContextService.getContext = mockStaticMethod;
    mockStaticMethod.mockReturnValue({
      requestId: "ut-test-request-id" + Math.random(),
    });
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

    // check if commandBus SignupCommand is called
    expect(signupController).toBeDefined();
    expect(signupController.signup).toBeDefined();

    // check if result is correct
    expect(result).toBeDefined();
    expect(result).toEqual({
      id: "test-id",
    });
  });
});
