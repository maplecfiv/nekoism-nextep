import { DispatchService } from "./DispatchService";

export type ServiceAction = string;
export type ServiceId = string;

export abstract class BaseService {
    protected dispatchService: DispatchService | undefined;

    abstract processAction(action: ServiceAction, args: Map<string, unknown>):boolean;

    public setDispatchService(dispatchService: DispatchService): void {
        this.dispatchService = dispatchService;
    }
}