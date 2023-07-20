import { AsyncLocalStorage } from "async_hooks";
export class RequestContext<TRequest = any, TResponse = any> {
  static asyncLocalStorage = new AsyncLocalStorage<RequestContext>();

  static get currentContext() {
    return this.asyncLocalStorage.getStore();
  }

  constructor(public readonly req: TRequest, public readonly res: TResponse) {}
}
