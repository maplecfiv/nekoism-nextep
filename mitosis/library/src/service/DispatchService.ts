import { BaseService, ServiceAction, ServiceId } from "./BaseService";

export class DispatchService {

    constructor(private services: Map<ServiceId, BaseService> = new Map()){}

    public setServices(services: Map<ServiceId, BaseService>) {
        services.forEach((service, serviceId) => {
            service.setDispatchService(this);
            this.services.set(serviceId, service);
        });
    }

    public onMessage(serviceId: ServiceId, action: ServiceAction, args: Map<string, unknown> = new Map()) {
        console.debug(`service ${serviceId} process ${action} with args: ${JSON.stringify(args)}`);

        if (this.services.get(serviceId)?.processAction(action, args) ?? false) {
            return;
        }
        console.warn(`unknown ${serviceId} method ${action} (${JSON.stringify(args)})`);
    }

    public getService(serviceId:ServiceId):BaseService{
        if (!this.services.has(serviceId)){
            throw new Error(`Unkown service ${serviceId}`);
        }
        return this.services.get(serviceId)!;
    }
}