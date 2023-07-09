import {keyOf} from "arktype";
import {ExpiresIn} from "@all-in-one/account/domain";

type SignPayload<T extends object> = {
  [K in keyof T]: T[K];
} & {id: string}

export class SignRequestDto<T extends object> {

  data: SignPayload<T>;

  expiresIn: ExpiresIn;

  secret: string;

  constructor(props: SignRequestDto<T>) {
    this.data = props.data;
    this.expiresIn = props.expiresIn;
    this.secret = props.secret;
  }
}
