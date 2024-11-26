export enum DATA_STATUS {
    ACTIVE = 'active',
    INACTIVE = 'inactive'
}

export type ObjectId = string;
export type ISO8601Date = Date;

export class DataObject {
    constructor(readonly objectId: ObjectId, readonly createdAt: ISO8601Date, readonly updatedAt: ISO8601Date, private readonly createdBy: ObjectId, private readonly updatedBy: ObjectId, private status: DATA_STATUS, private readonly version: string) {}
}