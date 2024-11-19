import { createContext } from "react";

export default createContext<any>({
  _ticket: {},
  get ticket() {
    return this._ticket;
  },
  setTicket(ticket: Form) {
    console.log(`set ticket ${JSON.stringify(ticket)}`);
    this._ticket = ticket;
  },
});
