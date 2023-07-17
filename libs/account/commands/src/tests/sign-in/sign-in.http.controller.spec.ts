import { Test, TestingModule } from "@nestjs/testing";
import { CqrsModule } from "@nestjs/cqrs";
import { SignInHttpController } from "../../lib/sign-in/sign-in.http.controller";
import { RequestContextService } from "@all-in-one/core/application";

describe("signInHttpController", () => {
  let app: TestingModule;
  const mockStaticMethod = jest.fn();

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [SignInHttpController],
      providers: [],
      imports: [CqrsModule],
    }).compile();
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

  afterAll(async () => {
    // todo: clear database after test
  });
});
