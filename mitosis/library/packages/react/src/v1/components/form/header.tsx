import * as React from "react";
import { LANGUAGES } from "@nextep/core/v1/models/Language";
import {
  Header as TicketComponentHeader,
  HEADER_LEVELS,
} from "@nextep/core/v1/models/workflow/TicketComponent";

function Header(props: any) {
  return <div>{renderHeader(header)}</div>;
}

export default Header;
