import { IsEmail, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SignInResponseDto {
  @ApiProperty({
    example: "access-token",
    description: "User access token",
  })
  refreshToken: string;

  @ApiProperty({
    example: "refresh-token",
    description: "User refresh token",
  })
  accessToken: string;

  // to prevent typescript error
  constructor(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}
