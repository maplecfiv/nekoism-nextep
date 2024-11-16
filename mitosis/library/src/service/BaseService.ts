import { DispatchService } from "./DispatchService";

export type ServiceAction = string;

export abstract class BaseService {
    protected dispatchService: DispatchService | undefined;

    abstract processAction(action: ServiceAction, args: Map<string, unknown>);

    public static getStaticName(): string {
        throw new Error('unimplemented getName()');
    }

    public abstract getName(): string;

    public setDispatchService(dispatchService: DispatchService): void {
        this.dispatchService = dispatchService;
    }
}