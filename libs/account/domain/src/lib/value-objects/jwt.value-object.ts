import { ValueObject } from "@all-in-one/core/ddd";
import { ExpiresIn, JwtSecret } from ".";
export interface JwtPros {
  secret: string;
  expiresIn: number;
}
export class Jwt extends ValueObject<JwtPros> {
  /**
   * Already validated in the value object of secret and expires in
   * @param props
   * @protected
   */
  protected validate(props: JwtPros): void {
    new JwtSecret({ value: props.secret });
    new ExpiresIn({ value: props.expiresIn });
  }
}
