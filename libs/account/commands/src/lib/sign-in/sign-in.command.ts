import { Command, CommandProps } from "@all-in-one/core/ddd";

export class SignInCommand extends Command {
  readonly email: string;

  readonly password: string;

  constructor(props: CommandProps<SignInCommand>) {
    super(props);
    this.email = props.email;
    this.password = props.password;
  }
}
