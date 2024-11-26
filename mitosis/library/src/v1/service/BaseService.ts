import { DispatchService } from "./DispatchService";

export type ServiceAction = string;
export type ServiceId = string;

export abstract class BaseService {
    protected dispatchService: DispatchService | undefined;

    async processAction(action: ServiceAction, args: Map<string, unknown>):Promise<boolean>{
        throw Error(`unsupported processAction ${action}`)
    }

    public setDispatchService(dispatchService: DispatchService): void {
        this.dispatchService = dispatchService;
    }
}