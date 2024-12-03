import 'server-only'

import { DataAdaptor, RecordNotFoundException, UnknownAdaptorException } from './DataAdaptor.ts';
import { AccessControlObject } from '../models/acl/AccessControlObject.ts';

import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

export type BatchRequest = {
    requests: BatchRequestItem[]
}
export type BatchRequestItem = {
    method: string,
    path: string,
    body: object
}

export class ParseAdaptor extends DataAdaptor {

    private static readonly instance = axios.create({
        headers: {
            'X-Parse-Application-Id': 'APPLICATION_ID',
            'X-Parse-Master-Key': 'MASTER_KEY',
            'Content-Type': 'application/json'
        },
        baseURL: `${process.env.parseServer}/parse/`
    });

    public static getInstance() {
        return ParseAdaptor.instance
    }

    public async findObject(entity: string, id: string): Promise<AxiosResponse> {
        try {
            return ParseAdaptor.getInstance().get(`${entity}/${id}`);
        } catch (_e) {
            const e = _e as AxiosError;
            switch (e.status) {
                case 404:
                    throw new RecordNotFoundException();
                default:
                    throw new UnknownAdaptorException(e.message);
            }
        }
    }

    public static async processBatch(batchRequest: BatchRequest): Promise<AxiosResponse> {
        try {
            return (await ParseAdaptor.getInstance().post('batch', {
                batchRequest
            }));
        } catch (e: any) {
            throw new Error(`${e.toJSON().message}`);
        }
    }

}