"use client";
import * as React from "react";
import { useState } from "react";
import {
  Label as TicketComponentLabel,
  InputText as TicketComponentInputText,
  TicketComponentLabelValue,
} from "@nextep/core/v1/models/workflow/TicketComponent";
import Label from "./label";

function InputText(props: any) {
  const [_value, set_value] = useState(() => "");

  function value() {
    return _value;
  }

  function setInputValue(inputValue: number) {
    set_value(inputValue);
  }

  return (
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
        onBlur={(event) => setInputValue}
        value={(props.component as TicketComponentInputText)
          .getValue()
          .getValue()}
        placeholder={
          props.component.getOption().placeHolder.get(props.language) ?? ""
        }
      />
    </label>
  );
}

export default InputText;
