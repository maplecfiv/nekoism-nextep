import { ActionResult, BaseService, ServiceAction, ServiceId, UnsupportedServiceActionException } from "../BaseService";
import { ParseAdaptor } from "@nextep/core/v1/adaptors/ParseAdaptor";
import { OrganizationService } from "./OrganizationService";
import { UserToken } from "@nextep/core/v1/models/acl/UserSession";

export enum AUTH_TYPES {
  SSO = 'sso'
}

class LoginException extends Error { }

export class AuthService extends BaseService {

  public static readonly SERVICE_ID: ServiceId = AuthService.name;
  public static readonly KEY_USER_TOKEN = 'userToken';
  public static readonly KEY_USER_ORGANIZATION = 'userOrganization';
  public static readonly ACTION_LOGIN: ServiceAction = 'login';
  public static readonly ACTION_LOGOUT: ServiceAction = 'logout';
  public static readonly ACTION_VERIFY_USERTOKEN: ServiceAction = 'verifyUserToken';

  async processLogout(): Promise<boolean> {
    const response = await ParseAdaptor.getInstance().post('logout')
    console.log(response);
    // TODO: cross check userToken by sending to original server for verification
    return true;
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

  async isVerifiedUserToken(userToken: string): Promise<boolean> {
    // TODO: cross check userToken by sending to original server for verification
    return true;
  }

  private async processLogin(userOrganization: string, userToken: string): Promise<ActionResult> {

    if (!await this.isVerifiedUserToken(userToken)) {
      return {
        isSuccess: false,
        error: {
          type: LoginException.name,
          message: `user token ${userToken} cannot be verified`
        }
      };
    }

    if (!(await OrganizationService.getInstance().processAction(OrganizationService.ACTION_CHECK_EXIST, BaseService.createArguments({ key: OrganizationService.KEY_USER_ORGANIZATION, value: userOrganization }))).isSuccess) {
      return {
        isSuccess: false,
        error: {
          type: LoginException.name,
          message: `org ${userOrganization} not exist`
        }
      };
    }

    const loginResponse = await ParseAdaptor.getInstance().post('users', AuthService.userAuthData(userToken));

    if (!loginResponse.data.sessionToken) {
      return {
        isSuccess: false,
        error: {
          type: LoginException.name,
          message: `invalid credentical`
        }
      };
    }
    return {
      isSuccess: true,
      payload: loginResponse.data
    };

  }

  public async processAction(action: ServiceAction, args: Map<string, any>): Promise<ActionResult> {
    switch (action) {
      case AuthService.ACTION_VERIFY_USERTOKEN:
        return {
          isSuccess: await this.isVerifiedUserToken(args.get(AuthService.KEY_USER_TOKEN))
        }
      case AuthService.ACTION_LOGIN:
        return this.processLogin(args.get(AuthService.KEY_USER_ORGANIZATION), args.get(AuthService.KEY_USER_TOKEN));
      case AuthService.ACTION_LOGOUT:
        return {
          isSuccess: await this.processLogout()
        };
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