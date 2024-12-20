import { Form as TicketComponentForm, Header as TicketComponentHeader, InputNumber as TicketComponentInputNumber, InputText as TicketComponentInputText, Label as TicketComponentLabel, Section as TicketComponentSection, TicketComponentFormValue, TicketComponentLabelValue, TicketComponentSectionValue, TicketComponentTextValue, TicketComponentNumberValue, FormElement, InputDate, InputTime, InputText, DropdownSelection, InputUrl, RadioSelection, Label, InputFile, TicketComponentSelectableValue, TicketComponentFileValue, InputNumber, TicketComponentUrlValue, CheckBoxSelection } from "@nextep/core/v1/models/workflow/TicketComponent";
import { ActionResult, BaseService, ServiceAction, ServiceId, UnsupportedServiceActionException } from "../BaseService";
import { LANGUAGES } from "@nextep/core/v1/models/Language";
export class TicketService extends BaseService {
  public static readonly SERVICE_ID: ServiceId = TicketService.name;
  public static readonly LOAD_TICKET: ServiceAction = 'load_ticket';
  public static initTicket(): TicketComponentForm {
    return new TicketComponentForm("", new TicketComponentFormValue(new Map<LANGUAGES, string>(), []));
  }
  override async processAction(action: ServiceAction, args: Map<string, any>): Promise<ActionResult> {
    switch (action) {
      case TicketService.LOAD_TICKET:
        this.setTicket(this.createDemoForm());
        return {
          isSuccess: true
        };
      default:
        const unsupportedServiceActionException = new UnsupportedServiceActionException(TicketService.name, action)
        return {
          isSuccess: false,
          error: {
            type: UnsupportedServiceActionException.name,
            message: unsupportedServiceActionException.message
          }
        };
    }
  }

  private createDemoForm() {


    const sectionMap = new Map<string, FormElement[]>();
    sectionMap.set("Basic Information", []);
    sectionMap.set("Special Information", []);
    sectionMap.set("Alarm Information", []);
    sectionMap.set("Handling Party Information", []);
    sectionMap.set("Resolution Information", []);
    sectionMap.set("Response Information", []);


    sectionMap.get("Basic Information")!.push(new FormElement({ labelMap: new Map<LANGUAGES, string>([[LANGUAGES.EN_US, "Creation Date"]]), type: InputDate.name }));
    sectionMap.get("Basic Information")!.push(new FormElement({ labelMap: new Map<LANGUAGES, string>([[LANGUAGES.EN_US, "Creation Time"]]), type: InputTime.name }));
    sectionMap.get("Basic Information")!.push(new FormElement({ labelMap: new Map<LANGUAGES, string>([[LANGUAGES.EN_US, "Ticket ID"]]), type: InputText.name }));
    sectionMap.get("Basic Information")!.push(new FormElement({ labelMap: new Map<LANGUAGES, string>([[LANGUAGES.EN_US, "Ticket Reference ID"]]), type: InputText.name }));
    sectionMap.get("Basic Information")!.push(new FormElement({
      labelMap: new Map<LANGUAGES, string>([[LANGUAGES.EN_US, "Emergency Level"]]), type: DropdownSelection.name, option: {
        values: [
          new TicketComponentSelectableValue(new Map<LANGUAGES, string>([[LANGUAGES.EN_US, "Priority"]]), "Priority"),
          new TicketComponentSelectableValue(new Map<LANGUAGES, string>([[LANGUAGES.EN_US, "Critical"]]), "Critical"),
          new TicketComponentSelectableValue(new Map<LANGUAGES, string>([[LANGUAGES.EN_US, "General"]]), "General"),
          new TicketComponentSelectableValue(new Map<LANGUAGES, string>([[LANGUAGES.EN_US, "Low"]]), "Low"),
        ]
      }
    }));

    sectionMap.get("Basic Information")!.push(new FormElement({
      labelMap: new Map<LANGUAGES, string>([[LANGUAGES.EN_US, "Status"]]), type: DropdownSelection.name, option: {
        values: [
          new TicketComponentSelectableValue(new Map<LANGUAGES, string>([[LANGUAGES.EN_US, "Assigned"]]), "Assigned"),
          new TicketComponentSelectableValue(new Map<LANGUAGES, string>([[LANGUAGES.EN_US, "In Progress"]]), "In Progress"),
          new TicketComponentSelectableValue(new Map<LANGUAGES, string>([[LANGUAGES.EN_US, "Cancelled"]]), "Cancelled"),
          new TicketComponentSelectableValue(new Map<LANGUAGES, string>([[LANGUAGES.EN_US, "Closed"]]), "Closed"),
          new TicketComponentSelectableValue(new Map<LANGUAGES, string>([[LANGUAGES.EN_US, "Completed"]]), "Completed"),
          new TicketComponentSelectableValue(new Map<LANGUAGES, string>([[LANGUAGES.EN_US, "Resolved"]]), "Resolved"),
        ]
      }
    }));

    sectionMap.get("Basic Information")!.push(new FormElement({
      labelMap: new Map<LANGUAGES, string>([[LANGUAGES.EN_US, "Ticket Nature"]]), type: DropdownSelection.name, option: {
        values: [
          new TicketComponentSelectableValue(new Map<LANGUAGES, string>([[LANGUAGES.EN_US, "Auto alarm trigger"]]), "AssiAuto alarm triggergned"),
          new TicketComponentSelectableValue(new Map<LANGUAGES, string>([[LANGUAGES.EN_US, "Manual"]]), "Manual"),
          new TicketComponentSelectableValue(new Map<LANGUAGES, string>([[LANGUAGES.EN_US, "Manual batch upload"]]), "Manual batch upload")
        ]
      }
    }));

    sectionMap.get("Basic Information")!.push(new FormElement({ labelMap: new Map<LANGUAGES, string>([[LANGUAGES.EN_US, "Ticket Direct Access URL"]]), type: InputUrl.name }));
    sectionMap.get("Basic Information")!.push(new FormElement({ labelMap: new Map<LANGUAGES, string>([[LANGUAGES.EN_US, "UNMS URL"]]), type: InputUrl.name }));
    sectionMap.get("Special Information")!.push(new FormElement({
      labelMap: new Map<LANGUAGES, string>([[LANGUAGES.EN_US, "Special Alarm"]]), type: RadioSelection.name, option: {
        values: [
          new TicketComponentSelectableValue(new Map<LANGUAGES, string>([[LANGUAGES.EN_US, "Yes"]]), "true"),
          new TicketComponentSelectableValue(new Map<LANGUAGES, string>([[LANGUAGES.EN_US, "No"]]), "false"),
        ]
      }
    }));
    sectionMap.get("Special Information")!.push(new FormElement({
      labelMap: new Map<LANGUAGES, string>([[LANGUAGES.EN_US, "Maintenance Mode "]]), type: RadioSelection.name, option: {
        values: [
          new TicketComponentSelectableValue(new Map<LANGUAGES, string>([[LANGUAGES.EN_US, "Yes"]]), "true"),
          new TicketComponentSelectableValue(new Map<LANGUAGES, string>([[LANGUAGES.EN_US, "No"]]), "false"),
        ]
      }
    }));
    sectionMap.get("Alarm Information")!.push(new FormElement({ labelMap: new Map<LANGUAGES, string>([[LANGUAGES.EN_US, "Alarm Date"]]), type: InputDate.name }));
    sectionMap.get("Alarm Information")!.push(new FormElement({ labelMap: new Map<LANGUAGES, string>([[LANGUAGES.EN_US, "Alarm Time"]]), type: InputTime.name }));
    sectionMap.get("Alarm Information")!.push(new FormElement({ labelMap: new Map<LANGUAGES, string>([[LANGUAGES.EN_US, "Alarm Description"]]), type: InputText.name }));
    sectionMap.get("Alarm Information")!.push(new FormElement({ labelMap: new Map<LANGUAGES, string>([[LANGUAGES.EN_US, "Affected Equipment Name"]]), type: InputText.name }));
    sectionMap.get("Alarm Information")!.push(new FormElement({ labelMap: new Map<LANGUAGES, string>([[LANGUAGES.EN_US, "Affected Equipment ID"]]), type: InputText.name }));
    sectionMap.get("Alarm Information")!.push(new FormElement({ labelMap: new Map<LANGUAGES, string>([[LANGUAGES.EN_US, "Affected Equipment Platform"]]), type: InputText.name }));
    sectionMap.get("Alarm Information")!.push(new FormElement({ labelMap: new Map<LANGUAGES, string>([[LANGUAGES.EN_US, "Affected Equipment Location (Facility Name)"]]), type: InputText.name }));
    sectionMap.get("Alarm Information")!.push(new FormElement({ labelMap: new Map<LANGUAGES, string>([[LANGUAGES.EN_US, "Affected Equipment Location (Floor)"]]), type: InputText.name }));
    sectionMap.get("Alarm Information")!.push(new FormElement({ labelMap: new Map<LANGUAGES, string>([[LANGUAGES.EN_US, "Affected Equipment Location (Zone)"]]), type: InputText.name }));
    sectionMap.get("Alarm Information")!.push(new FormElement({ labelMap: new Map<LANGUAGES, string>([[LANGUAGES.EN_US, "Affected Equipment Location (Area)"]]), type: InputText.name }));
    sectionMap.get("Alarm Information")!.push(new FormElement({ labelMap: new Map<LANGUAGES, string>([[LANGUAGES.EN_US, "Affected Equipment Location (Latitude)"]]), type: InputText.name }));
    sectionMap.get("Alarm Information")!.push(new FormElement({ labelMap: new Map<LANGUAGES, string>([[LANGUAGES.EN_US, "Affected Equipment Location (Longitude)"]]), type: InputText.name }));
    /*sectionMap.get("Correlative Ticket Information")!.push(new FormElement({labelMap: new Map<LANGUAGES, string>([[LANGUAGES.EN_US,  "Correlative Ticket ID (s)"]]), type:"		Shown as table listing"}));
    sectionMap.get("Correlative Ticket Information")!.push(new FormElement({labelMap: new Map<LANGUAGES, string>([[LANGUAGES.EN_US,  "Correlative Ticket Date (s)"]]), type:"		Shown as table listing"}));
    sectionMap.get("Correlative Ticket Information")!.push(new FormElement({labelMap: new Map<LANGUAGES, string>([[LANGUAGES.EN_US,  "Correlative Ticket Time (s)"]]), type:"		Shown as table listing"}));
    sectionMap.get("Correlative Ticket Information")!.push(new FormElement({labelMap: new Map<LANGUAGES, string>([[LANGUAGES.EN_US,  "Correlation Relationship"]]), type:"		Shown as tree diagram"}));*/
    sectionMap.get("Handling Party Information")!.push(new FormElement({ labelMap: new Map<LANGUAGES, string>([[LANGUAGES.EN_US, "In-Charge Maintenance Team"]]), type: "Dropdown" }));
    sectionMap.get("Handling Party Information")!.push(new FormElement({ labelMap: new Map<LANGUAGES, string>([[LANGUAGES.EN_US, "Coordinator"]]), type: "Dropdown" }));
    sectionMap.get("Handling Party Information")!.push(new FormElement({ labelMap: new Map<LANGUAGES, string>([[LANGUAGES.EN_US, "Handling Worker"]]), type: "Dropdown" }));
    sectionMap.get("Handling Party Information")!.push(new FormElement({ labelMap: new Map<LANGUAGES, string>([[LANGUAGES.EN_US, "Handling Worker Company Name"]]), type: "Dropdown" }));
    sectionMap.get("Handling Party Information")!.push(new FormElement({ labelMap: new Map<LANGUAGES, string>([[LANGUAGES.EN_US, "Handling Worker Contact Information"]]), type: InputText.name }));
    sectionMap.get("Handling Party Information")!.push(new FormElement({ labelMap: new Map<LANGUAGES, string>([[LANGUAGES.EN_US, "Viewed Date"]]), type: InputText.name }));
    sectionMap.get("Handling Party Information")!.push(new FormElement({ labelMap: new Map<LANGUAGES, string>([[LANGUAGES.EN_US, "Viewed Time"]]), type: InputText.name }));
    sectionMap.get("Handling Party Information")!.push(new FormElement({ labelMap: new Map<LANGUAGES, string>([[LANGUAGES.EN_US, "Relevant Party Worker"]]), type: "Dropdown" }));
    sectionMap.get("Handling Party Information")!.push(new FormElement({ labelMap: new Map<LANGUAGES, string>([[LANGUAGES.EN_US, "Relevant Party Company Name"]]), type: "Dropdown" }));
    sectionMap.get("Handling Party Information")!.push(new FormElement({ labelMap: new Map<LANGUAGES, string>([[LANGUAGES.EN_US, "Relevant Party Contact Information"]]), type: InputText.name }));
    sectionMap.get("Resolution Information")!.push(new FormElement({ labelMap: new Map<LANGUAGES, string>([[LANGUAGES.EN_US, "Work Date"]]), type: InputDate.name }));
    sectionMap.get("Resolution Information")!.push(new FormElement({ labelMap: new Map<LANGUAGES, string>([[LANGUAGES.EN_US, "Work Time"]]), type: InputTime.name }));
    sectionMap.get("Resolution Information")!.push(new FormElement({ labelMap: new Map<LANGUAGES, string>([[LANGUAGES.EN_US, "Work Number"]]), type: InputText.name }));
    sectionMap.get("Resolution Information")!.push(new FormElement({ labelMap: new Map<LANGUAGES, string>([[LANGUAGES.EN_US, "Work Location"]]), type: InputText.name }));
    sectionMap.get("Resolution Information")!.push(new FormElement({ labelMap: new Map<LANGUAGES, string>([[LANGUAGES.EN_US, "Supporting Document"]]), type: InputFile.name }));
    sectionMap.get("Resolution Information")!.push(new FormElement({ labelMap: new Map<LANGUAGES, string>([[LANGUAGES.EN_US, "Work Description"]]), type: InputText.name }));
    sectionMap.get("Resolution Information")!.push(new FormElement({ labelMap: new Map<LANGUAGES, string>([[LANGUAGES.EN_US, "Before Fixing Photo (s)"]]), type: InputFile.name }));
    sectionMap.get("Resolution Information")!.push(new FormElement({ labelMap: new Map<LANGUAGES, string>([[LANGUAGES.EN_US, "After Fixing Photo (s)"]]), type: InputFile.name }));
    sectionMap.get("Response Information")!.push(new FormElement({ labelMap: new Map<LANGUAGES, string>([[LANGUAGES.EN_US, "Assigned by Name"]]), type: InputText.name }));
    sectionMap.get("Response Information")!.push(new FormElement({ labelMap: new Map<LANGUAGES, string>([[LANGUAGES.EN_US, "Assigned by Company Name"]]), type: InputText.name }));
    sectionMap.get("Response Information")!.push(new FormElement({ labelMap: new Map<LANGUAGES, string>([[LANGUAGES.EN_US, "Assigned by Date"]]), type: InputText.name }));
    sectionMap.get("Response Information")!.push(new FormElement({ labelMap: new Map<LANGUAGES, string>([[LANGUAGES.EN_US, "Assigned by Description"]]), type: InputText.name }));
    sectionMap.get("Response Information")!.push(new FormElement({ labelMap: new Map<LANGUAGES, string>([[LANGUAGES.EN_US, "Assigned by Signature"]]), type: InputText.name }));
    sectionMap.get("Response Information")!.push(new FormElement({ labelMap: new Map<LANGUAGES, string>([[LANGUAGES.EN_US, "Reviewed by Name"]]), type: InputText.name }));
    sectionMap.get("Response Information")!.push(new FormElement({ labelMap: new Map<LANGUAGES, string>([[LANGUAGES.EN_US, "Reviewed by Company Name"]]), type: InputText.name }));
    sectionMap.get("Response Information")!.push(new FormElement({ labelMap: new Map<LANGUAGES, string>([[LANGUAGES.EN_US, "Reviewed by Date"]]), type: InputText.name }));
    sectionMap.get("Response Information")!.push(new FormElement({ labelMap: new Map<LANGUAGES, string>([[LANGUAGES.EN_US, "Reviewed by Description"]]), type: InputText.name }));
    sectionMap.get("Response Information")!.push(new FormElement({ labelMap: new Map<LANGUAGES, string>([[LANGUAGES.EN_US, "Reviewed by Signature"]]), type: InputText.name }));
    sectionMap.get("Response Information")!.push(new FormElement({ labelMap: new Map<LANGUAGES, string>([[LANGUAGES.EN_US, "Approved by Name"]]), type: InputText.name }));
    sectionMap.get("Response Information")!.push(new FormElement({ labelMap: new Map<LANGUAGES, string>([[LANGUAGES.EN_US, "Approved by Company Name"]]), type: InputText.name }));
    sectionMap.get("Response Information")!.push(new FormElement({ labelMap: new Map<LANGUAGES, string>([[LANGUAGES.EN_US, "Approved by Date"]]), type: InputText.name }));
    sectionMap.get("Response Information")!.push(new FormElement({ labelMap: new Map<LANGUAGES, string>([[LANGUAGES.EN_US, "Approved by Description"]]), type: InputText.name }));
    sectionMap.get("Response Information")!.push(new FormElement({ labelMap: new Map<LANGUAGES, string>([[LANGUAGES.EN_US, "Approved by Signature"]]), type: InputText.name }));

    const formId = `demo`

    console.log("sectionMap", sectionMap);

    const sections: TicketComponentSection[] = [];
    sectionMap.forEach((formElements, sectionName) => {
      let matchIndex = -1;
      for (let idx = 0; idx < sections.length; idx++) {
        console.log(`compare ${sections[idx].getValue().getLabel(LANGUAGES.EN_US)} <> ${sectionName}`)
        if (sections[idx].getValue().getLabel(LANGUAGES.EN_US) === sectionName) {
          matchIndex = idx;
          break;
        }
      }
      console.log(`matchIndex`, matchIndex)
      let section = matchIndex == -1 ? new TicketComponentSection(`${formId}-${sections.length}`, new TicketComponentSectionValue(new Map<LANGUAGES, string>([[LANGUAGES.EN_US, sectionName]]), [])) : sections[matchIndex];
      formElements.forEach((formElement, idx) => {
        switch (formElement.getType()) {
          case InputText.name:
            section.getValue().getValue().push(
              new InputText(`${sectionName}-${idx}`,
                new TicketComponentTextValue(formElement.getLabelMap(), "")
              ))
            break;
          case InputFile.name:
            section.getValue().getValue().push(
              new InputFile(`${sectionName}-${idx}`,
                new TicketComponentFileValue(formElement.getLabelMap(), "")
              ))
            break;
          case InputNumber.name:
            section.getValue().getValue().push(
              new InputNumber(`${sectionName}-${idx}`,
                new TicketComponentNumberValue(formElement.getLabelMap(), -1)
              ))
            break;
          case InputUrl.name:
            section.getValue().getValue().push(
              new InputUrl(`${sectionName}-${idx}`,
                new TicketComponentUrlValue(formElement.getLabelMap(), '')
              ))
            break;
          case DropdownSelection.name:
            section.getValue().getValue().push(
              new DropdownSelection(`${sectionName}-${idx}`,
                new TicketComponentSelectableValue(formElement.getLabelMap(), ''),
                {
                  values: ((formElement.getOption() as { values: TicketComponentSelectableValue[] }).values as TicketComponentSelectableValue[])
                }
              ))
            break;
          case CheckBoxSelection.name:
            section.getValue().getValue().push(
              new DropdownSelection(`${sectionName}-${idx}`,
                new TicketComponentSelectableValue(formElement.getLabelMap(), ''),
                {
                  values: ((formElement.getOption() as { values: TicketComponentSelectableValue[] }).values as TicketComponentSelectableValue[])
                }
              ))
            break;
          case RadioSelection.name:
            section.getValue().getValue().push(
              new RadioSelection(`${sectionName}-${idx}`,
                new TicketComponentSelectableValue(formElement.getLabelMap(), ''),
                {
                  values: ((formElement.getOption() as { values: TicketComponentSelectableValue[] }).values as TicketComponentSelectableValue[])
                }
              ))
            break;
          case Label.name:
            section.getValue().getValue().push(
              new Label(`${sectionName}-${idx}`,
                new TicketComponentLabelValue(formElement.getLabelMap())
              ))
            break;
        }
      });
      if (matchIndex == -1) {
        console.log('insert', section);
        sections.push(section);
      } else {
        console.log(`set to ${matchIndex}`, section);
        sections[matchIndex] = section;
      }
      console.log(`section`, section);
    });

    console.log(sections);

    return new TicketComponentForm('demoForm', new TicketComponentFormValue(new Map<LANGUAGES, string>([[LANGUAGES.EN_US, "Demo Ticket"]]), sections), {
      columns: 2
    });
  }

  constructor(private setTicket: (value: TicketComponentForm) => void) {
    super();
  }
}