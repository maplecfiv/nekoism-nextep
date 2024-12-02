"use client";
import * as React from "react";
import { useState } from "react";
import { InputTime as TicketComponentInputTime } from "@nextep/core/v1/models/workflow/TicketComponent";

function InputTime(props: any) {
  const [_value, set_value] = useState(() => "");

  function value() {
    return _value;
  }

  function setInputValue(inputValue: string) {
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
        type="time"
        className="input input-bordered w-full "
        name={props.component.getId()}
        id={props.component.getId()}
        onChange={(event) => setInputValue}
        value={(props.component as TicketComponentInputTime)
          .getValue()
          .getValue()}
        placeholder={
          props.component.getOption().placeHolder?.get(props.language) ?? ""
        }
      />
    </label>
  );
}

export default InputTime;
