import { BaseService, ServiceAction } from "./BaseService";
export enum PAGES {
  LOGIN,
  DASHBOARD,
}
export class PageService extends BaseService {
  public static readonly PAGE_KEY = 'pageId';
  public static readonly ROUTE_TO_PAGE: ServiceAction = 'route_to_page';
  constructor(private setPage: (value: PAGES) => void) {
    super();
  }
  processAction(action: ServiceAction, args: Map<string, unknown>) {
    if (action == PageService.ROUTE_TO_PAGE) {
      this.setPage(args.get(PageService.PAGE_KEY) as PAGES ?? PAGES.LOGIN);
    }
    console.warn(`${PageService.name} skip unknown method ${action}`);
  }
  public static override getStaticName(): string {
    return PageService.name;
  }
  public override getName(): string {
    return PageService.getStaticName();
  }
}