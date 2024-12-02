"use client";
import * as React from "react";
import { useState } from "react";
import { InputDate as TicketComponentInputDate } from "@nextep/core/v1/models/workflow/TicketComponent";

function InputDate(props: any) {
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
        type="date"
        className="input input-bordered w-full "
        name={props.component.getId()}
        id={props.component.getId()}
        onChange={(event) => setInputValue}
        value={(props.component as TicketComponentInputDate)
          .getValue()
          .getValue()}
        placeholder={
          props.component.getOption().placeHolder?.get(props.language) ?? ""
        }
      />
    </label>
  );
}

export default InputDate;
