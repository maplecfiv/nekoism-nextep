import * as React from "react";
import { LANGUAGES } from "@nextep/core/models/Language";
import {
  Header as TicketItemHeader,
  HEADER_LEVELS,
} from "@nextep/core/models/TicketItem";

function Header(props: any) {
  return <div>{renderHeader(header)}</div>;
}

export default Header;
