import { DispatchService } from "./client/DispatchService";
export type ServiceAction = string;
export type ServiceId = string;
export type ActionResult = {
  isSuccess: boolean,
  payload?: any
  error?: ActionError
}

export type ActionError = {
  type: string,
  message: string
}

export type KeyValuePair = {
  key: string,
  value: any
}

export class UnsupportedServiceActionException extends Error {
  constructor(service: any, action: ServiceAction) {
    super(`${service.name}.${action}`)
  }
}

export abstract class BaseService {
  private dispatchService: DispatchService | undefined;
  
  async processAction(action: ServiceAction, args?: Map<string, any>): Promise<ActionResult> {
    throw Error(`unsupported processAction ${action}`);
  }
  public getDispatchService(): DispatchService {
    return this.dispatchService!;
  }
  public setDispatchService(dispatchService: DispatchService): void {
    this.dispatchService = dispatchService;
  }

  public static createArguments(...keyValuePairs: KeyValuePair[]) {

    const args = new Map<string, any>();
    keyValuePairs.forEach((p) => {
      args.set(p.key, p.value);
    })

    return args;
  }
}