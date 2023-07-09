/**
 * This sensitive decorator is used to mark a class containing sensitive data.
 * This decorator is used to prevent logging of sensitive data.
 * If a class is marked with this decorator, the class will be logged as [SENSITIVE DATA]
 * @example
 * @Sensitive
 * class CreateUserRequestDto {
 *  @ApiProperty({
 *  example: ''
 *  })
 *  @IsEmail()
 *  @MaxLength(320)
 *  @MinLength(5)
 *  readonly email: string;
 *  }
 * @param ctr
 * @constructor
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function Sensitive<T extends { new(...args: any[]): {} }>(ctr: T) {
  return class extends ctr {
    override toString() {
      return '[SENSITIVE DATA]';
    }

    isSensitive() {
      return true;
    }
  };
}
