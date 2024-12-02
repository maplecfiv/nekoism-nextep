import { ActionResult, BaseService, ServiceAction, ServiceId, UnsupportedServiceActionException } from "../BaseService";
import { ParseAdaptor } from "@nextep/core/v1/adaptors/ParseAdaptor";
import { RecordAlreadyExistException, RecordNotFoundException, UnknownAdaptorException } from "../../adaptors/DataAdaptor";

export class OrganizationService extends BaseService {

    public static readonly instance: OrganizationService = new OrganizationService();

    public static readonly SERVICE_ID: ServiceId = OrganizationService.name;
    public static readonly KEY_USER_ORGANIZATION = 'userOrganization';
    public static readonly FIND_BY_NAME: ServiceAction = 'findByKey';
    public static readonly ACTION_CREATE: ServiceAction = 'create';
    public static readonly ACTION_CHECK_EXIST: ServiceAction = 'checkExist';


    public static getInstance(): OrganizationService { return OrganizationService.instance; }

    private async isExist(key: string): Promise<boolean> {
        const result = (await this.processFindByKey(key));
        return result.payload?.data?.results?.length != 0;
    }

    private async processCreate(key: string): Promise<ActionResult> {

        if (await this.isExist(key)) {
            return {
                isSuccess: false,
                error: {
                    type: RecordAlreadyExistException.name,
                    message: `org ${key} already created`
                }

            }
        }

        console.log(`trying to create org ${key}`)
        try {
            return {
                isSuccess: true,
                payload: (await ParseAdaptor.getInstance().post(`classes/Organization`, {
                    key: key
                })).data

            };
        } catch (e) {
            return {
                isSuccess: false,
                error: {
                    type: UnknownAdaptorException.name,
                    message: (e as Error).message
                }
            };
        }
    }

    private async processFindByKey(key: string): Promise<ActionResult> {

        try {
            return {
                isSuccess: true,
                payload: await ParseAdaptor.getInstance().get(`classes/Organization`, {
                    data: {
                        where: { key: key }
                    }
                })
            };
        } catch (e) {
            if (e instanceof RecordNotFoundException) {
                return {
                    isSuccess: false,
                    error: {
                        type: RecordNotFoundException.name,
                        message: e.message
                    }
                };
            }
            return {
                isSuccess: false,
                error: {
                    type: UnknownAdaptorException.name,
                    message: (e as Error).message
                }
            };
        }
    }

    public async processAction(action: ServiceAction, args: Map<string, any>): Promise<ActionResult> {
        switch (action) {
            case OrganizationService.ACTION_CHECK_EXIST:
                return {
                    isSuccess: await this.isExist(args.get(OrganizationService.KEY_USER_ORGANIZATION))
                }

            case OrganizationService.ACTION_CREATE:
                return await this.processCreate(args.get(OrganizationService.KEY_USER_ORGANIZATION))
            default:
                const unsupportedServiceActionException = new UnsupportedServiceActionException(OrganizationService.name, action)
                return {
                    isSuccess: false,
                    error: {
                        type: UnsupportedServiceActionException.name,
                        message: unsupportedServiceActionException.message
                    }
                };
        }
    }

}