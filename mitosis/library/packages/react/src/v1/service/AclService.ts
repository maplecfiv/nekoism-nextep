import { BaseService, ServiceAction, ServiceId } from "./BaseService";
export class AclService extends BaseService {
  public static readonly SERVICE_ID: ServiceId = AclService.name;
  public static readonly CHECK_ACL: ServiceAction = 'check_acl';
  public async processAction(action: ServiceAction, args: Map<string, unknown>): Promise<boolean> {
    switch (action) {
      case AclService.CHECK_ACL:
        console.log(`bypass checking for ${JSON.stringify(args)}`);
        return true;
      default:
        return false;
    }
  }
}