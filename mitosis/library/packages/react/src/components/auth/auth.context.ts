import { createContext } from "react";

export default createContext<any>({
  _userToken: "",
  get userToken() {
    return this._userToken;
  },
  setUserToken(userToken: UserToken) {
    this._userToken = userToken;
  },
});
