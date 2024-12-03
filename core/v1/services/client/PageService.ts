import { AclService } from "./AclService";
import { ActionResult, BaseService, ServiceAction, ServiceId, UnsupportedServiceActionException } from "../BaseService";
import { TicketService } from "./TicketService";
export enum PAGES {
  LOGIN,
  DASHBOARD,
  FORM_DESIGNER,
  START_WORKFLOW,
  UNAUTHORIZED,
  LOADING
}
export class PageService extends BaseService {
  public static readonly SERVICE_ID: ServiceId = PageService.name;
  public static readonly PAGE_KEY = 'pageId';
  public static readonly ROUTE_TO_PAGE: ServiceAction = 'route_to_page';
  constructor(private setPage: (value: PAGES) => void) {
    super();
  }
  override async processAction(action: ServiceAction, args: Map<string, any>): Promise<ActionResult> {
    switch (action) {
      case PageService.ROUTE_TO_PAGE:
        try {
          const aclArgs = new Map<string, any>();
          aclArgs.set('page', args.get(PageService.PAGE_KEY));
          this.getDispatchService().onMessage(AclService.SERVICE_ID, AclService.CHECK_ACL, aclArgs);
        } catch (e) {
          args.set(PageService.PAGE_KEY, PAGES.UNAUTHORIZED);
        }
        switch (args.get(PageService.PAGE_KEY) as PAGES) {
          case PAGES.LOGIN:
            break;
          case PAGES.DASHBOARD:
            const _args: Map<string, any> = new Map();
            _args.set('ticketId', '123');
            await this.getDispatchService().onMessage(TicketService.SERVICE_ID, TicketService.LOAD_TICKET, _args);
            break;
        }
        this.setPage(args.get(PageService.PAGE_KEY) as PAGES);
        return {
          isSuccess: true
        };
      default:
        const unsupportedServiceActionException = new UnsupportedServiceActionException(PageService.name, action)
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