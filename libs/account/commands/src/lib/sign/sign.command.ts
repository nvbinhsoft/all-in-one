export class SignRequestDto<T = object> {
  id: string;

  data: T;

  constructor(props: SignRequestDto<T>) {
    this.id = props.id;
    this.data = props.data;
  }
}
