import { Test, TestingModule } from "@nestjs/testing";
import { CqrsModule } from "@nestjs/cqrs";
import { SignInHttpController } from "../../lib/sign-in/sign-in.http.controller";

describe("signInHttpController", () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [SignInHttpController],
      providers: [],
      imports: [CqrsModule],
    }).compile();
  });

  it("should init", () => {
    expect(app).toBeDefined();
  });

  afterAll(async () => {
    // todo: clear database after test
  });
});
