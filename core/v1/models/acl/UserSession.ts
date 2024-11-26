import { DATA_STATUS, DataObject, ISO8601Date, ObjectId } from "../DataObject.ts";

export type UserToken = string;

export class UserSession extends DataObject {
    constructor(objectId: ObjectId, createdAt: ISO8601Date, updatedAt: ISO8601Date, createdBy: ObjectId, updatedBy: ObjectId, status: DATA_STATUS, version: string, private userToken: UserToken) {
        super(objectId, createdAt, updatedAt, createdBy, updatedBy, status, version)
    }
}