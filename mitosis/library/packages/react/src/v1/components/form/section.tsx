import * as React from "react";
import { LANGUAGES } from "@nextep/core/v1/models/Language";
import {
  CheckBoxSelection as TicketComponentCheckBoxSelection,
  DropdownSelection as TicketComponentDropdownSelection,
  Header as TicketComponentHeader,
  InputNumber as TicketComponentInputNumber,
  InputText as TicketComponentInputText,
  Label as TicketComponentLabel,
  RadioSelection as TicketComponentRadioSelection,
  Section as TicketComponentSection,
  TicketComponent,
  TicketComponentSectionValue,
  TicketComponentValueType,
} from "@nextep/core/v1/models/workflow/TicketComponent";
import Label from "./label";
import InputText from "./input-text";
import InputNumber from "./input-number";

function Section(props: any) {
  return (
    <div>
      {(props.component as TicketComponentSection)
        .getValue()
        .getValue()
        .map((element: TicketComponent<TicketComponentValueType>) => {
          console.log(
            props.component,
            `section element: ${JSON.stringify(element)}`
          );
          switch (element.getName()) {
            case TicketComponentLabel.name:
              return (
                <Label
                  key={element.getId()}
                  language={props.language}
                  component={element}
                ></Label>
              );
            case TicketComponentInputText.name:
              return (
                <InputText
                  key={element.getId()}
                  language={props.language}
                  component={element}
                ></InputText>
              );
            case TicketComponentInputNumber.name:
              return (
                <InputNumber
                  key={element.getId()}
                  language={props.language}
                  component={element}
                ></InputNumber>
              );
            default:
              console.warn(`unknown component type ${element.getName()}`);
          }
        })}
    </div>
  );
}

export default Section;
