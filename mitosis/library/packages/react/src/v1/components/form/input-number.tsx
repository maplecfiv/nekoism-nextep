"use client";
import * as React from "react";
import { useState } from "react";
import {
  Label as TicketComponentLabel,
  InputNumber as TicketComponentInputNumber,
  TicketComponentLabelValue,
} from "@nextep/core/v1/models/workflow/TicketComponent";
import Label from "./label";

function InputNumber(props: any) {
  const [_value, set_value] = useState(() => 0);

  function value() {
    return _value;
  }

  function setInputValue(inputValue: number) {
    set_value(inputValue);
  }

  return (
    <label className="form-control w-full ">
      <div className="label">
        <span className="label-text">
          {props.component.getValue().getLabel(props.language)}
        </span>
      </div>
      <input
        type="number"
        className="input input-bordered w-full "
        name={props.component.getId()}
        id={props.component.getId()}
        onChange={(event) => setInputValue}
        value={(props.component as TicketComponentInputNumber)
          .getValue()
          .getValue()}
        placeholder={
          props.component.getOption().placeHolder?.get(props.language) ?? ""
        }
      />
    </label>
  );
}

export default InputNumber;
