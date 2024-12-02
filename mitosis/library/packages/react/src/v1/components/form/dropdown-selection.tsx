"use client";
import * as React from "react";
import { useState } from "react";
import { DropdownSelection as TicketComponentDropdownSelection } from "@nextep/core/v1/models/workflow/TicketComponent";

function DropdownSelection(props: any) {
  const [_value, set_value] = useState(() => "");

  function value() {
    return _value;
  }

  function setInputValue(inputValue: number) {
    set_value(inputValue);
  }

  return (
    <label className="form-control w-full" htmlFor={props.component.getId()}>
      <div className="label">
        <span className="label-text">
          {props.component.getValue().getLabel(props.language)}
        </span>
      </div>
      <select
        className="select select-bordered"
        id={props.component.getId()}
        name={props.component.getId()}
      >
        {(props.component as TicketComponentDropdownSelection)
          .getOption()
          .values?.map((optionValue, index) => (
            <option
              key={`${props.component.getId()}-${index}`}
              value={optionValue.getValue()}
            >
              {optionValue.getLabel(props.language)}
            </option>
          ))}
      </select>
    </label>
  );
}

export default DropdownSelection;
