import { createContext } from '@builder.io/mitosis';
import { UserToken } from '@nextep/core/models/User';

export default createContext({
  _userToken: '',
  get userToken() {
    return this._userToken;
  },
  setUserToken(userToken:UserToken) {
    this._userToken = userToken;
  }
});