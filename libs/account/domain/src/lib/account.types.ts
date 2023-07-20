import { Email, Password, SaltRound, ExpiresIn } from "./value-objects";
import { HashPort } from "./ports";
import { JwtSecret } from "./value-objects";
import { Jwt } from "./value-objects/jwt.value-object";

export interface AccountProps {
  email: Email;

  hash: string;
}

// properties that needed for user signup process
export interface SignupProps {
  email: Email;

  password: Password;

  saltRound: SaltRound;
}

export interface SignInProps {
  email: Email;
  password: Password;
  accessTokenProps: Jwt;
  refreshTokenProps: Jwt;
  hashService: HashPort;
}

export interface GenerateTokenProps {
  jwt: Jwt;
  hashService: HashPort;
}
