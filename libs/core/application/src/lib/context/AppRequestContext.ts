import {RequestContext} from "nestjs-request-context";

export class AppRequestContext extends RequestContext {
  requestId: string | null = null;
}

export class RequestContextService {
  static getContext(): AppRequestContext {
    const ctx: AppRequestContext = RequestContext.currentContext.req;
    return ctx;
  }

  static setRequestId(id: string): void {
    const ctx = this.getContext();
    ctx.requestId = id;
  }

  static getRequestId(): string {
    const requestId = this.getContext().requestId;
    if (!this.requestIdNotEmptyGuard(requestId)) {
      throw new Error('Request id is not set');
    }

    return requestId;
  }

  private static requestIdNotEmptyGuard(id: string | null): id is string {
    return id !== null;
  }
}
