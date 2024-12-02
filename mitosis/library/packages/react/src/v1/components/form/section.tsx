import * as React from "react";
import {
  CheckBoxSelection as TicketComponentCheckBoxSelection,
  DropdownSelection as TicketComponentDropdownSelection,
  InputUrl as TicketComponentInputUrl,
  InputDate as TicketComponentInputDate,
  InputTime as TicketComponentInputTime,
  InputFile as TicketComponentInputFile,
  InputNumber as TicketComponentInputNumber,
  InputText as TicketComponentInputText,
  Label as TicketComponentLabel,
  RadioSelection as TicketComponentRadioSelection,
  Section as TicketComponentSection,
  TicketComponent,
  TicketComponentValueType,
} from "@nextep/core/v1/models/workflow/TicketComponent";
import Label from "./label";
import InputText from "./input-text";
import InputNumber from "./input-number";
import InputDate from "./input-date";
import InputTime from "./input-time";
import InputFile from "./input-file";
import InputUrl from "./input-url";
import CheckBoxSelection from "./checkbox-selection";
import DropdownSelection from "./dropdown-selection";
import RadioSelection from "./radio-selection";

function Section(props: any) {
  return (
    <div>
      <h3>
        {(props.component as TicketComponentSection)
          .getValue()
          .getLabel(props.language)}
      </h3>
      {(props.component as TicketComponentSection)
        .getValue()
        .getValue()
        .map((element: TicketComponent<TicketComponentValueType>) => {
          switch (element.getName()) {
            case TicketComponentLabel.name:
              return (
                <Label
                  key={element.getId()}
                  language={props.language}
                  component={element}
                ></Label>
              );
            case TicketComponentInputFile.name:
              return (
                <InputFile
                  key={element.getId()}
                  language={props.language}
                  component={element}
                ></InputFile>
              );
            case TicketComponentInputDate.name:
              return (
                <InputDate
                  key={element.getId()}
                  language={props.language}
                  component={element}
                ></InputDate>
              );
            case TicketComponentInputUrl.name:
              return (
                <InputUrl
                  key={element.getId()}
                  language={props.language}
                  component={element}
                ></InputUrl>
              );
            case TicketComponentInputTime.name:
              return (
                <InputTime
                  key={element.getId()}
                  language={props.language}
                  component={element}
                ></InputTime>
              );
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
            case TicketComponentCheckBoxSelection.name:
              return (
                <CheckBoxSelection
                  key={element.getId()}
                  language={props.language}
                  component={element}
                ></CheckBoxSelection>
              );
            case TicketComponentDropdownSelection.name:
              return (
                <DropdownSelection
                  key={element.getId()}
                  language={props.language}
                  component={element}
                ></DropdownSelection>
              );
            case TicketComponentRadioSelection.name:
              return (
                <RadioSelection
                  key={element.getId()}
                  language={props.language}
                  component={element}
                ></RadioSelection>
              );
            default:
              console.warn(`unknown component type ${element.getName()}`);
          }
        })}
    </div>
  );
}

export default Section;
