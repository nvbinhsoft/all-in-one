import { v4 } from "uuid";
import { Injectable, Scope } from "@nestjs/common";
import { RequestContext } from "@all-in-one/core/middleware/request-context";

@Injectable({
  scope: Scope.REQUEST,
})
export class AppRequestContext extends RequestContext {
  // this id can be automatically generated
  // or can be passed from the client
  requestId: string = v4();
}

export class RequestContextService {
  static getContext(): AppRequestContext {
    const ctx: AppRequestContext = RequestContext.currentContext?.req;
    return ctx;
  }

  static setRequestId(id: string): void {
    const ctx = this.getContext();
    ctx.requestId = id;
  }

  static getRequestId(): string {
    const requestId = this.getContext().requestId;
    if (!this.requestIdNotEmptyGuard(requestId)) {
      throw new Error("Request id is not set");
    }

    return requestId;
  }

  private static requestIdNotEmptyGuard(id: string | undefined): id is string {
    return id !== null;
  }
}
