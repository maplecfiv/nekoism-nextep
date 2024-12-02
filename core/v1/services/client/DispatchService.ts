import { BaseService, ServiceAction, ServiceId } from "../BaseService";
export class DispatchService {
  constructor(private services: Map<ServiceId, BaseService> = new Map()) { }
  public addService(serviceId: ServiceId, service: BaseService) {
    service.setDispatchService(this);
    this.services.set(serviceId, service);
  }
  public async onMessage(serviceId: ServiceId, action: ServiceAction, args: Map<string, any> = new Map()): Promise<void> {
    const actionResult = await this.services.get(serviceId)?.processAction(action, args) ?? {
      isSuccess: false,
      payload: `unknown ${serviceId} method ${action} (${JSON.stringify(args)})`
    };
    console.log(`${serviceId} method ${action} (${JSON.stringify(args)}): ${JSON.stringify(actionResult)}`);
  }
  public getService(serviceId: ServiceId): BaseService {
    if (!this.services.has(serviceId)) {
      throw new Error(`Unkown service ${serviceId}`);
    }
    return this.services.get(serviceId)!;
  }
}