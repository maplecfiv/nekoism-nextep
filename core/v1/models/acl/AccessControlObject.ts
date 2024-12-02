import { DATA_STATUS, DataObject, DataObjectType, ISO8601Date, ObjectId } from "../DataObject.ts";

export enum ACL_ENTRY {
    PROGRESS = 'progress',
    TICKET = 'ticket',
    REPORT = 'report',
    WORKFLOW = 'workflow'
}

export enum ACL_TYPE {
    ACCESS = 'access',
    CREATE = 'create',
    EDIT = 'edit',
    REMOVE = 'remove',
    EXPORT = 'export',
    ASSIGNMENT = 'assignment',
}

export enum ACL_SCOPE {
    SELF = 'self',
    INTER_GROUP = 'inter_group',
    INTER_ORGANIZATION = 'inter_organization',
    ASSIGNED = 'assigned'
}

export type AccessControlObjectType = DataObjectType | {
    aclEntry: ACL_ENTRY, aclType: ACL_TYPE, aclScope: ACL_SCOPE
}

export class AccessControlObject extends DataObject {
    constructor(private readonly accessControlObjectType: AccessControlObjectType) {
        super(accessControlObjectType as DataObjectType)
    }
}