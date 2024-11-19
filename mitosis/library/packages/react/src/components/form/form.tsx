import * as React from "react";
import { LANGUAGES } from "@nextep/core/models/Language";
import {
  Form as TicketComponentForm,
  Section as TicketComponentSection,
  TicketComponentFormValue,
  TicketComponentSectionValue,
} from "@nextep/core/models/TicketComponent";
import Section from "./section";

function Form(props: any) {
  return (
    <form>
      <div className="flex w-full flex-col lg:flex-row">
        {Array((props.component as TicketComponentForm).getOptions().columns)
          .fill(0)
          .map((e, i) => {
            return (props.component as TicketComponentForm)
              .getValue()
              .getValue()
              .filter((_e, _i) => {
                if ((_i + 1) % i == 0) {
                  console.debug(`add ${_i} for column ${i}`);
                  return true;
                }
                return false;
              });
          })
          .map((elements) => {
            return elements.map((element, index) => {
              return (
                <Section
                  key={`${element.getId()}-section-${index}`}
                  language={props.language}
                  component={element}
                ></Section>
              );
            });
          })
          .flatMap((list, idx) => {
            if (idx == 0) {
              return list;
            }
            return [<div className="divider lg:divider-horizontal" />, list];
          })}
      </div>
    </form>
  );
}

export default Form;
