export class UnknownAdaptorException extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class RecordNotFoundException extends Error { }

export class DataSourceUnreachableException extends Error{}

export class RecordAlreadyExistException extends Error{}

export abstract class DataAdaptor {

}