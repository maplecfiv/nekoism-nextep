import { VERSION } from "../config";

export enum DATA_STATUS {
    ACTIVE = 'active',
    INACTIVE = 'inactive'
}

export type ObjectId = string;
export type ISO8601Date = Date;

export type DataObjectType = {
    objectId?: ObjectId, createdAt?: ISO8601Date, updatedAt?: ISO8601Date, createdBy?: ObjectId, updatedBy?: ObjectId, status?: DATA_STATUS, version?: string
}

export class DataObject {
    constructor(protected readonly dataObjectType: DataObjectType) { }
}