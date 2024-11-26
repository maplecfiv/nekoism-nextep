import * as React from "react";
import { Label as TicketComponentLabel } from "@nextep/core/v1/models/workflow/TicketComponent";

function Label(props: any) {
  return (
    <label
      className="block text-sm/6 font-medium text-gray-900"
      htmlFor={props.componentFor ?? ""}
    >
      {(props.component as TicketComponentLabel)
        .getValue()
        .getLabel(props.language)}
    </label>
  );
}

export default Label;
