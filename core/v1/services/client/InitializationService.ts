import { UserSession } from "../../models/acl/UserSession";
import { AuthService } from "./AuthService";
import { ActionResult, BaseService, ServiceAction, ServiceId, UnsupportedServiceActionException } from "../BaseService";
import { OrganizationService } from "./OrganizationService";
import { AxiosUtil } from "../../utils/AxiosUtil";
import { VERSION } from "../../config";

enum SERVICE_TYPE {
    STANDALONE = 'standalone'
}

export class InitializationException extends Error {
    constructor(message: string) {
        super(message)
    }
}
export class InvalidInitializationOptionException extends Error { }
export class InvalidInitializationAccountException extends Error { }
export class InvalidInitializationOrganizationException extends Error { }

export class InitializationService extends BaseService {
    public static readonly SERVICE_ID: ServiceId = InitializationService.name;
    public static readonly ACTION_INIT: ServiceAction = 'init';

    public async processAction(action: ServiceAction, args: Map<string, any>): Promise<ActionResult> {
        switch (action) {
            case InitializationService.ACTION_INIT:
                return await this.processInit(args.get(AuthService.KEY_USER_ORGANIZATION), args.get(AuthService.KEY_USER_TOKEN))
            default:
                const unsupportedServiceActionException = new UnsupportedServiceActionException(InitializationService.name, action)
                return {
                    isSuccess: false,
                    error: {
                        type: UnsupportedServiceActionException.name,
                        message: unsupportedServiceActionException.message
                    }
                };
        }
    }

    private async processInit(userToken: string, userOrganization: string): Promise<ActionResult> {
        const response = await AxiosUtil.getInstance().post(`api/${VERSION}/install`, {
            "ssoId": userToken,
            "method": process.env.serviceType,
            "userOrganization": userOrganization
        })
        console.log(response);
        // TODO: cross check userToken by sending to original server for verification
        return response.data.toJSON() as ActionResult;
    }
}