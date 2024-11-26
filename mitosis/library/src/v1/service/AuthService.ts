import { UserToken } from "@nextep/core/v1/models/acl/UserSession";
import { BaseService, ServiceAction, ServiceId } from "./BaseService";
import { PAGES, PageService } from "./PageService";

export class AuthService extends BaseService {
    public static readonly SERVICE_ID: ServiceId = AuthService.name;

    public static readonly KEY_USER_TOKEN = 'userToken';

    public static readonly LOGIN: ServiceAction = 'login';
    public static readonly LOGOUT: ServiceAction = 'logout';

    constructor(private userToken:UserToken, private setUserToken: (value: UserToken) => void) {
        super();
    }

    async processAction(action: ServiceAction, args: Map<string, unknown>): Promise<boolean> {
        switch (action) {
            case AuthService.LOGIN:
                this.setUserToken(`${args.get(AuthService.KEY_USER_TOKEN) ?? ''}`);
                await this.dispatchService?.onMessage(PageService.SERVICE_ID, PageService.ROUTE_TO_PAGE, new Map([[PageService.PAGE_KEY, PAGES.DASHBOARD]]));
                return true;
            case AuthService.LOGOUT:
                this.setUserToken('');
                await this.dispatchService?.onMessage(PageService.SERVICE_ID, PageService.ROUTE_TO_PAGE, new Map([[PageService.PAGE_KEY, PAGES.LOGIN]]));
                return true;
            default:
                return false;
        }
    }
}