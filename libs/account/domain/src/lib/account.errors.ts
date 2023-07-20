import { ExceptionBase } from "@all-in-one/core/exceptions";

export class AccountAlreadyExistsException extends ExceptionBase {
  static readonly message = "Account already exists";

  public readonly code = "ACCOUNT.ALREADY_EXISTS";

  constructor(cause?: Error, metadata?: unknown) {
    super(AccountAlreadyExistsException.message, cause, metadata);
  }
}

export class InvalidUsernamePasswordException extends ExceptionBase {
  static readonly message = "Invalid username or password";

  public readonly code = "ACCOUNT.INVALID_USERNAME_PASSWORD";

  constructor(cause?: Error, metadata?: unknown) {
    super(InvalidUsernamePasswordException.message, cause, metadata);
  }
}
