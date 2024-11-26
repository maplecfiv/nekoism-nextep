import { createContext } from '@builder.io/mitosis';

import {
  Form
} from "@nextep/core/v1/models/workflow/TicketComponent";
import { TicketService } from '../../service/TicketService';

const initTicket = TicketService.initTicket()

export default createContext({
  _ticket: {},
  get ticket() {
    return this._ticket;
  },
  setTicket(ticket: Form) {
    console.log(`set ticket ${JSON.stringify(ticket)}`);
    this._ticket = ticket;
  }
});