import { BaseService, ServiceAction } from "./BaseService";
export class DispatchService {
  constructor(private services: BaseService[]) {
    this.services.forEach(service => {
      service.setDispatchService(this);
    });
  }
  public onMessage(serviceName: string, action: ServiceAction, args: Map<string, unknown> = new Map()) {
    this.services.forEach((_service: BaseService) => {
      if (_service.getName() == serviceName) {
        _service.processAction(action, args);
      }
    });
    console.debug(`service ${serviceName} process ${action} with args: ${args}`);
  }
}