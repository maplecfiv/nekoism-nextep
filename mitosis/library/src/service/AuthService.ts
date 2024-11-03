export class AuthService {

    constructor(private setUserToken: (value: string) => void) {

    }

    public logout() {
        this.setUserToken('');
    }

    public login(userToken: string) {
        this.setUserToken(userToken);
    }
}