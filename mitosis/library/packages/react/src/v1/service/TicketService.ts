import { Form as TicketComponentForm, Header as TicketComponentHeader, InputNumber as TicketComponentInputNumber, InputText as TicketComponentInputText, Label as TicketComponentLabel, Section as TicketComponentSection, TicketComponentFormValue, TicketComponentLabelValue, TicketComponentSectionValue, TicketComponentTextValue, TicketComponentNumberValue } from "@nextep/core/v1/models/workflow/TicketComponent";
import { BaseService, ServiceAction, ServiceId } from "./BaseService";
import { LANGUAGES } from "@nextep/core/v1/models/Language";
export class TicketService extends BaseService {
  public static readonly SERVICE_ID: ServiceId = TicketService.name;
  public static readonly LOAD_TICKET: ServiceAction = 'load_ticket';
  public static initTicket(): TicketComponentForm {
    return new TicketComponentForm("", new TicketComponentFormValue(new Map<LANGUAGES, string>(), []));
  }
  override async processAction(action: ServiceAction, args: Map<string, unknown>): Promise<boolean> {
    switch (action) {
      case TicketService.LOAD_TICKET:
        this.setTicket(new TicketComponentForm(`${args.get('ticketId') ?? ''}`, new TicketComponentFormValue(new Map<LANGUAGES, string>([[LANGUAGES.EN_US, "testing form"]]), [0, 1, 2, 3, 4, 5, 6].map(idx => {
          return new TicketComponentSection(`${args.get('ticketId') ?? ''}-section-${idx}`, new TicketComponentSectionValue(new Map<LANGUAGES, string>([[LANGUAGES.EN_US, `testing section-${idx}`]]), [new TicketComponentLabel(`${args.get('ticketId') ?? ''}-section-label-${idx}`, new TicketComponentLabelValue(new Map<LANGUAGES, string>([[LANGUAGES.EN_US, `testing label-${idx}`]]))), new TicketComponentInputText(`${args.get('ticketId') ?? ''}-input-text-${idx}`, new TicketComponentTextValue(new Map<LANGUAGES, string>([[LANGUAGES.EN_US, `testing input text-${idx}`]]), `value ${idx}`)), new TicketComponentInputNumber(`${args.get('ticketId') ?? ''}-input-number-${idx}`, new TicketComponentNumberValue(new Map<LANGUAGES, string>([[LANGUAGES.EN_US, `testing input number-${idx}`]]), idx))]));
        })), {
          columns: 2
        }));
        return true;
      default:
        return false;
    }
  }
  constructor(private setTicket: (value: TicketComponentForm) => void) {
    super();
  }
}