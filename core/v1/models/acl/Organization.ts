import { DATA_STATUS, DataObject, DataObjectType, ISO8601Date, ObjectId } from "../DataObject.ts";


export type OrganizationType = DataObjectType | {
    name: string
}

export class Organization extends DataObject {
    constructor(private readonly organizationType: OrganizationType) {
        super(organizationType as DataObjectType)
    }
}