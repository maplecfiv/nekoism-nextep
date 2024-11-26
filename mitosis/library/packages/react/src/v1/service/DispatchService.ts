import { BaseService, ServiceAction, ServiceId } from "./BaseService";
export class DispatchService {
  constructor(private services: Map<ServiceId, BaseService> = new Map()) {}
  public addService(serviceId: ServiceId, service: BaseService) {
    service.setDispatchService(this);
    this.services.set(serviceId, service);
  }
  public async onMessage(serviceId: ServiceId, action: ServiceAction, args: Map<string, unknown> = new Map()): Promise<void> {
    console.debug(`service ${serviceId} process ${action} with args: ${JSON.stringify(args)}`);
    if ((await this.services.get(serviceId)?.processAction(action, args)) ?? false) {
      return;
    }
    console.warn(`unknown ${serviceId} method ${action} (${JSON.stringify(args)})`);
  }
  public getService(serviceId: ServiceId): BaseService {
    if (!this.services.has(serviceId)) {
      throw new Error(`Unkown service ${serviceId}`);
    }
    return this.services.get(serviceId)!;
  }
}