import { ActionResult, BaseService, ServiceAction, ServiceId, UnsupportedServiceActionException } from "../BaseService";
import { PAGES, PageService } from "./PageService";
import { OrganizationService } from "./OrganizationService";
import { UserToken } from "../../models/acl/UserSession";
import { AxiosUtil } from "../../utils/AxiosUtil";
import { Axios } from "axios";
import { VERSION } from "../../config";

export enum AUTH_TYPES {
  SSO = 'sso'
}

class LoginException extends Error { }

export class AuthService extends BaseService {

  public static readonly SERVICE_ID: ServiceId = AuthService.name;
  public static readonly KEY_USER_TOKEN = 'userToken';
  public static readonly KEY_USER_ORGANIZATION = 'userOrganization';
  public static readonly ACTION_GET_USER_TOKEN: ServiceAction = 'getUserToken';
  public static readonly ACTION_LOGIN: ServiceAction = 'login';
  public static readonly ACTION_LOGOUT: ServiceAction = 'logout';
  public static readonly ACTION_VERIFY_USERTOKEN: ServiceAction = 'verifyUserToken';

  constructor(private userToken: UserToken, private setUserToken: (value: UserToken) => void) {
    super();
  }

  private async processGetUserToken(): Promise<string> {
    return this.userToken
  }

  private async processLogout(): Promise<ActionResult> {
    const response = await AxiosUtil.getInstance(this.userToken).post(`api/${VERSION}/logout`)
    console.log(response);
    // TODO: cross check userToken by sending to original server for verification
    return (response.data.toJSON() as ActionResult);
  }

  public static userAuthData(id: string) {
    return {
      "authData": {
        "anonymous": {
          "id": id
        }
      }
    }
  }

  private async isVerifiedUserToken(userToken: string): Promise<boolean> {
    // TODO: cross check userToken by sending to original server for verification
    return true;
  }

  private async processLogin(userOrganization: string, userToken: string): Promise<ActionResult> {
    const response = await AxiosUtil.getInstance(this.userToken).post(`api/${VERSION}/login`, {
      "ssoId": userToken,
      "method": process.env.serviceType,
      "userOrganization": userOrganization
    })
    return response.data.toJSON() as ActionResult
  }

  public async processAction(action: ServiceAction, args: Map<string, any>): Promise<ActionResult> {
    switch (action) {
      case AuthService.ACTION_VERIFY_USERTOKEN:
        return {
          isSuccess: await this.isVerifiedUserToken(args.get(AuthService.KEY_USER_TOKEN))
        }
      case AuthService.ACTION_GET_USER_TOKEN:
        const userToken = await this.processGetUserToken()
        return {
          isSuccess: userToken ? true : false,
          payload: userToken
        }

      case AuthService.ACTION_LOGIN:
        return this.processLogin(args.get(AuthService.KEY_USER_ORGANIZATION), args.get(AuthService.KEY_USER_TOKEN));
      case AuthService.ACTION_LOGOUT:
        await this.getDispatchService().onMessage(PageService.SERVICE_ID, PageService.ROUTE_TO_PAGE, new Map([[PageService.PAGE_KEY, PAGES.LOGIN]]));
        return await this.processLogout();
      default:
        const unsupportedServiceActionException = new UnsupportedServiceActionException(AuthService.name, action)
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