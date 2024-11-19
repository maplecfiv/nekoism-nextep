import * as React from "react";
import {
  Label as TicketComponentLabel,
  InputNumber as TicketComponentInputNumber,
  TicketComponentLabelValue,
} from "@nextep/core/models/TicketComponent";
import Label from "./label";

function InputNumber(props: any) {
  return (
    <div className="col-span-full">
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">
            {props.component.getValue().getLabel(props.language)}
          </span>
        </div>
        <input
          type="number"
          className="input input-bordered w-full max-w-xs"
          name={props.component.getId()}
          id={props.component.getId()}
          value={(props.component as TicketComponentInputNumber)
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

export default InputNumber;
