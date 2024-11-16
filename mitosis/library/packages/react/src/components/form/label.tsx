import * as React from "react";
import { LANGUAGES } from "@nextep/core/models/Language";
import { Label as TicketItemLabel } from "@nextep/core/models/TicketItem";

function Label(props: any) {
  return (
    <div>
      <p className="mt-1 text-sm/6 text-gray-600">
        {label.getValue().getLabel(language)}
      </p>
    </div>
  );
}

export default Label;
