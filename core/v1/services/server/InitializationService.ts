import { ParseAdaptor } from "../../adaptors/ParseAdaptor";
import { UserSession } from "../../models/acl/UserSession";
import { AuthService } from "./AuthService";
import { ActionResult, BaseService, ServiceAction, ServiceId, UnsupportedServiceActionException } from "../BaseService";
import { OrganizationService } from "./OrganizationService";

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
        const authService = AuthService.getInstance();
        const organizationService = OrganizationService.getInstance();

        if (process.env.serviceType != SERVICE_TYPE.STANDALONE) {
            return {
                isSuccess: false,
                error: {
                    type: InvalidInitializationOptionException.name,
                    message: `instance cannot be init with service type "${process.env.serviceType}"`
                }
            }
        }
        if (userToken.length == 0) {
            return {
                isSuccess: false,
                error: {
                    type: InvalidInitializationAccountException.name,
                    message: `userToken cannot be empty`
                }
            }
        }
        if (!await authService.processAction(AuthService.ACTION_VERIFY_USERTOKEN, BaseService.createArguments({ key: AuthService.KEY_USER_TOKEN, value: userToken }))) {
            return {

                isSuccess: false,
                error: {
                    type: InvalidInitializationAccountException.name,
                    message: `user token "${userToken}" cannot be verified`
                }

            };
        }
        if (userOrganization.length == 0) {
            return {
                isSuccess: false,
                error: {
                    type: InvalidInitializationOrganizationException.name,
                    message: `userOrganization "${userOrganization}" cannot be empty`
                }
            }
        }

        if (!(await organizationService.processAction(OrganizationService.ACTION_CHECK_EXIST, BaseService.createArguments({ key: OrganizationService.KEY_USER_ORGANIZATION, value: userOrganization }))).isSuccess) {
            return {
                isSuccess: false,
                error: {
                    type: InvalidInitializationOrganizationException.name,
                    message: `userOrganization "${userOrganization}" already registered`
                }

            }
        }

        try {
            return {
                isSuccess: true,
                payload: (await ParseAdaptor.processBatch({
                    requests: [
                        {
                            "method": "POST",
                            "path": "/parse/users",
                            "body": AuthService.userAuthData(userToken)
                        },
                        {
                            "method": "POST",
                            "path": "/parse/classes/Organization",
                            "body": {
                                "key": userOrganization
                            }
                        },
                        {
                            "method": "POST",
                            "path": "/parse/classes/Relationship",
                            "body": {
                                "organization": userOrganization,
                                "user": userToken,
                                "role": UserSession.ROLE_MASTER
                            }
                        }
                    ]
                })).data
            };
        } catch (e: any) {
            return {
                isSuccess: false,
                error: {
                    type: InitializationException.name,
                    message: e.message
                }
            };
        }




    }
}