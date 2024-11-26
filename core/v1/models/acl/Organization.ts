import { DATA_STATUS, DataObject, ISO8601Date, ObjectId } from "../DataObject.ts";

export class Organization extends DataObject {
    constructor(objectId: ObjectId, createdAt: ISO8601Date, updatedAt: ISO8601Date, createdBy: ObjectId, updatedBy: ObjectId, status: DATA_STATUS, version: string, private readonly name: string) {
        super(objectId, createdAt, updatedAt, createdBy, updatedBy, status, version)
    }
}