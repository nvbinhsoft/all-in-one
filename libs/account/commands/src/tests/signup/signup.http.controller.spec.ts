import { Test, TestingModule } from "@nestjs/testing";
import { SignupHttpController } from "../../lib/signup/signup.http.controller";

describe("signupHttpController", () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [SignupHttpController],
      providers: [],
    }).compile();
  });

  afterAll(async () => {
    // todo: clear database after test
  });
});
