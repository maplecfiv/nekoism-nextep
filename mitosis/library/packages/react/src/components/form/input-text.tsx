import * as React from "react";
import {
  Label as TicketComponentLabel,
  InputText as TicketComponentInputText,
  TicketComponentLabelValue,
} from "@nextep/core/models/TicketComponent";
import Label from "./label";

function InputText(props: any) {
  return (
    <div className="col-span-full">
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">
            {props.component.getValue().getLabel(props.language)}
          </span>
        </div>
        <input
          type="text"
          className="input input-bordered w-full max-w-xs"
          name={props.component.getId()}
          id={props.component.getId()}
          value={(props.component as TicketComponentInputText)
            .getValue()
            .getValue()}
          placeholder={
            props.component.getOption().placeHolder.get(props.language) ?? ""
          }
        />
      </label>
    </div>
  );
}

export default InputText;
