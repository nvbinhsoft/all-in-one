import {Body, Controller, HttpStatus, Inject, Post} from "@nestjs/common";
import {CommandBus} from "@nestjs/cqrs";
import {SignupRequestDto} from "./signup.request.dto";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {ApiErrorResponse, IdResponse} from "@all-in-one/core/api";
import {Result} from 'oxide.ts';
import {SignupCommand} from "./signup.command";
import {AggregateId} from "@all-in-one/core/ddd";

@Controller('v1')
export class SignupHttpController {

  constructor(@Inject(CommandBus) private readonly commandBus: CommandBus) {}


  @ApiOperation({ summary: 'Signup' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Email already exists',
    type: ApiErrorResponse
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  @Post('/account/signup')
  async signup(@Body() body: SignupRequestDto): Promise<IdResponse> {
    const command = new SignupCommand(body);
    const result: Result<AggregateId, Error> = await this.commandBus.execute(command);


    return new IdResponse('1');
  }


}
