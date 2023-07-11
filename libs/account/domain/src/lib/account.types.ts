import { Account } from "@prisma/client";
import { PrismaEntity } from "@all-in-one/core/utils/types";
import { Email } from "./value-objects/email.value-object";
import { Password } from "./value-objects/password.value-object";
import { SaltRound } from "./value-objects/salt-round.value-object";
import { ExpiresIn } from "@all-in-one/account/domain";
import { HashPort } from "./ports";
import { JwtSecret } from "./value-objects";

export interface AccountProps {
  email: Email;

  password: Password;

  hash: string;
}

// properties that needed for user signup process
export interface SignupProps {
  email: Email;

  password: Password;

  saltRound: SaltRound;
}

export interface GenerateTokenProps {
  secret: JwtSecret;
  expiresIn: ExpiresIn;
  hashService: HashPort;
}
