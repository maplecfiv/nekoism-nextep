import { ActionResult, BaseService, ServiceAction, ServiceId, UnsupportedServiceActionException } from "../BaseService";
import { RecordAlreadyExistException, RecordNotFoundException, UnknownAdaptorException } from "../../adaptors/DataAdaptor";
import { VERSION } from "../../config";
import { AxiosUtil } from "../../utils/AxiosUtil";

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
        const response = await AxiosUtil.getInstance().post(`api/${VERSION}/organization`, {
            key: key
        })
        console.log(response);
        // TODO: cross check userToken by sending to original server for verification
        return response.data.toJSON() as ActionResult;
    }

    private async processFindByKey(key: string): Promise<ActionResult> {
        const response = await AxiosUtil.getInstance().get(`api/${VERSION}/organization?action=search&key=${key}`)
        console.log(response);
        // TODO: cross check userToken by sending to original server for verification
        return response.data.toJSON() as ActionResult;
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