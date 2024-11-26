import Parse from 'parse';
import { DataAdaptor } from './DataAdaptor.ts';
import { AccessControlObject } from '../models/acl/AccessControlObject.ts';

import axios, { AxiosInstance } from 'axios';

export class ParseAdaptor extends DataAdaptor {

    private static readonly instance: AxiosInstance = axios.create({
        headers: {
            'X-Parse-Application-Id': 'APPLICATION_ID',
            'Content-Type': 'application/json'
        },
        baseURL: `'http://localhost:1337/parse'`
    })

    public static async test() {
        try {
            const response = await ParseAdaptor.instance.post('classes/GameScore',
                { "score": 1337, "playerName": "Sean Plott", "cheatMode": false }
            )
        } catch (error) {
            console.log(error);
        };
    }



}