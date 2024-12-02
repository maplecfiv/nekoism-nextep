"use client";
import * as React from "react";
import { useState } from "react";
import { CheckBoxSelection as TicketComponentCheckBoxSelection } from "@nextep/core/v1/models/workflow/TicketComponent";

function CheckBoxSelection(props: any) {
  const [_value, set_value] = useState(() => "");

  function value() {
    return _value;
  }

  function setInputValue(inputValue: number) {
    set_value(inputValue);
  }

  return (
    <>
      <div className="form-control">
        <label className="block checked:bg-blue-500">
          {props.component.getValue().getLabel(props.language)}
        </label>
      </div>
      <div className="form-control">
        {(props.component as TicketComponentCheckBoxSelection)
          .getOption()
          .values?.map((optionValue, index) => (
            <label
              className="label cursor-pointer"
              key={`${props.component.getId()}-${index}`}
              htmlFor={`${props.component.getId()}-${index}`}
            >
              <span className="label-text">
                {optionValue.getLabel(props.language)}
              </span>
              <input
                type="checkbox"
                className="checkbox"
                id={`${props.component.getId()}-${index}`}
                name={props.component.getId()}
                value={optionValue.getValue()}
              />
            </label>
          ))}
      </div>
    </>
  );
}

export default CheckBoxSelection;
