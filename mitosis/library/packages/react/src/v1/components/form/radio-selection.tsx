"use client";
import * as React from "react";
import { useState } from "react";
import { RadioSelection as TicketComponentRadioSelection } from "@nextep/core/v1/models/workflow/TicketComponent";

function RadioSelection(props: any) {
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
      {(props.component as TicketComponentRadioSelection)
        .getOption()
        .values?.map((optionValue, index) => (
          <div
            className="form-control"
            key={`${props.component.getId()}-${index}`}
          >
            <label className="label cursor-pointer">
              <span className="label-text">
                {optionValue.getLabel(props.language)}
              </span>
            </label>
            <input
              type="radio"
              className="radio checked:bg-blue-500"
              id={`${props.component.getId()}-${index}`}
              name={props.component.getId()}
            />
          </div>
        ))}
    </>
  );
}

export default RadioSelection;
