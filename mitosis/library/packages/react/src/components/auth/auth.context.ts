import { createContext } from "react";

export default createContext<any>({
  _user: false,
  _email: "",
  _password: "",
  setUser(_user) {
    this._user = _user;
  },
  getUser() {
    return this._user;
  },
  setEmail(_email) {
    this._email = _email;
  },
  setPassword(_password) {
    this._password = _password;
  },
  getEmail() {
    return this._email;
  },
  getPassword() {
    return this._password;
  },
});
