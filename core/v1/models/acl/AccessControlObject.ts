import { VERSION } from "../../config.ts";
import { DATA_STATUS, DataObject, ISO8601Date, ObjectId } from "../DataObject.ts";

export enum ACL_ENTRY {
    TICKET = 'ticket',
    REPORT = 'report'
}

export enum ACL_TYPE {
    ACCESS = 'access',
    CREATE = 'create',
    EDIT = 'edit',
    REMOVE = 'remove'
}

export enum ACL_SCOPE {
    SELF = 'self',
    INTER_GROUP = 'inter_group',
    INTER_ORGANIZATION = 'inter_organization'
}

export class AccessControlObject extends DataObject {
    constructor(objectId: ObjectId, createdAt: ISO8601Date, updatedAt: ISO8601Date, createdBy: ObjectId, updatedBy: ObjectId, status: DATA_STATUS, version: string, private readonly aclEntry: ACL_ENTRY, private readonly aclType: ACL_TYPE, private readonly aclScope: ACL_SCOPE) {
        super(objectId, createdAt, updatedAt, createdBy, updatedBy, status, version)
    }
}