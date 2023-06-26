import { Test, TestingModule } from '@nestjs/testing';
import {SignupHttpController} from "../../lib/signup/signup.http.controller";

describe('signupHttpController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [SignupHttpController],
      providers: [],
    }).compile();
  });

  // describe('getData', () => {
  //   it('should return "Hello API"', () => {
  //     const signupHttpController = app.get<SignupHttpController>(SignupHttpController);
  //   });
  // });
});
