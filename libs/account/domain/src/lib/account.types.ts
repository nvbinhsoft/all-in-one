import {Account} from "@prisma/client";
import {PrismaEntity} from "@all-in-one/core/utils/types";
import {Email} from "./value-objects/email.value-object";
import {Password} from "./value-objects/password.value-object";

export interface AccountProps {
  email: Email;

  password: Password;

  hash: string;
}


// properties that needed for user signup process
export interface SignupProps {
  email: Email;

  password: Password;
}
