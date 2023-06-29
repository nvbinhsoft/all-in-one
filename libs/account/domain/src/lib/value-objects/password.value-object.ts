import {ValueObject} from "@all-in-one/core/ddd";
import {LengthGuard} from "@all-in-one/core/guard";

export interface PasswordProps {
  password: string
}

export class Password extends ValueObject<PasswordProps> {

  protected override validate(props: PasswordProps): void {
    // add logic to validate a strong password
  }

}
