import { BaseService, ServiceAction } from "./BaseService";
import { PAGES, PageService } from "./PageService";
export class AuthService extends BaseService {
  public static readonly KEY_USER_TOKEN = 'userToken';
  public static readonly LOGIN: ServiceAction = 'login';
  public static readonly LOGOUT: ServiceAction = 'logout';
  constructor(private setUserToken: (value: string) => void) {
    super();
  }
  public static override getStaticName(): string {
    return AuthService.name;
  }
  public override getName(): string {
    return AuthService.getStaticName();
  }
  processAction(action: ServiceAction, args: Map<string, unknown>) {
    switch (action) {
      case AuthService.LOGIN:
        this.setUserToken(`${args.get(AuthService.KEY_USER_TOKEN) ?? ''}`);
        this.dispatchService?.onMessage(PageService.getStaticName(), PageService.ROUTE_TO_PAGE, new Map([[PageService.PAGE_KEY, PAGES.DASHBOARD]]));
        break;
      case AuthService.LOGOUT:
        this.setUserToken('');
        this.dispatchService?.onMessage(PageService.getStaticName(), PageService.ROUTE_TO_PAGE, new Map([[PageService.PAGE_KEY, PAGES.LOGIN]]));
        break;
      default:
        console.warn(`${AuthService.name} skip unknown method ${action}`);
    }
  }
}