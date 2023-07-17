import { Injectable, NestMiddleware } from "@nestjs/common";
import { RequestContext } from "./request-context.model";

@Injectable()
export class RequestContextMiddleware<Request = any, Response = any>
  implements NestMiddleware<Request, Response>
{
  use(req: Request, res: Response, next: () => void): void {
    RequestContext.asyncLocalStorage.run(new RequestContext(req, res), next);
  }
}
