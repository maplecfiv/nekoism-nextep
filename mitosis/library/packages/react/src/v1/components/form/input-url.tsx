"use client";
import * as React from "react";
import { useState } from "react";
import { InputUrl as TicketComponentInputUrl } from "@nextep/core/v1/models/workflow/TicketComponent";

function InputUrl(props: any) {
  const [_value, set_value] = useState(() => "");

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
        type="url"
        className="input input-bordered w-full "
        name={props.component.getId()}
        id={props.component.getId()}
        onChange={(event) => setInputValue}
        value={(props.component as TicketComponentInputUrl)
          .getValue()
          .getValue()}
        placeholder={
          props.component.getOption().placeHolder?.get(props.language) ?? ""
        }
      />
    </label>
  );
}

export default InputUrl;
