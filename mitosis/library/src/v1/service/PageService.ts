import { BaseService, ServiceAction, ServiceId } from "./BaseService";
import { TicketService } from "./TicketService";
import {ParseAdaptor} from '@nextep/core/v1/adaptors/ParseAdaptor'

export enum PAGES {
    LOGIN, DASHBOARD
}

export class PageService extends BaseService {
    public static readonly SERVICE_ID: ServiceId = PageService.name;

    public static readonly PAGE_KEY = 'pageId';

    public static readonly ROUTE_TO_PAGE: ServiceAction = 'route_to_page';

    constructor(private setPage: (value: PAGES) => void) {
        super();
    }
    override async processAction(action: ServiceAction, args: Map<string, unknown>): Promise<boolean> {
        switch (action) {
            case PageService.ROUTE_TO_PAGE:
                switch (args.get(PageService.PAGE_KEY) as PAGES) {
                    case PAGES.LOGIN:
                        break;
                    case PAGES.DASHBOARD:
                        const _args: Map<string, unknown> = new Map();
                        _args.set('ticketId', '123');
                        await ParseAdaptor.test();
                        await this.dispatchService?.onMessage(TicketService.SERVICE_ID, TicketService.LOAD_TICKET, _args);

                        break;
                }
                this.setPage(args.get(PageService.PAGE_KEY) as PAGES);

                return true;
            default:
                return false;
        }
    }
}