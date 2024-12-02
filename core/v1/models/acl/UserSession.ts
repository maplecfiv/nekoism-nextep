import { DATA_STATUS, DataObject, DataObjectType, ISO8601Date, ObjectId } from "../DataObject.ts";

export type UserToken = string;

export type UserSessionType = DataObjectType | {
    userToken: UserToken
}

export class UserSession extends DataObject {
    public static readonly ROLE_MASTER = 'master'

    constructor(private readonly userSessionType: UserSessionType) {
        super(userSessionType as DataObjectType)
    }
}