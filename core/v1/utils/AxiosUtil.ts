import axios, { AxiosInstance } from "axios";

export class AxiosUtil{

    public static getInstance(userToken?: string) {
        return axios.create({
            headers: {
                'Content-Type': 'application/json',
                'X-Parse-Session-Token': userToken
            },
            baseURL: process.env.backend
        })
    }
}
