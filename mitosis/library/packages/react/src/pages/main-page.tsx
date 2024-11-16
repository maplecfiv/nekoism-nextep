"use client";
import * as React from "react";
import { useState } from "react";

export type StoreType = {
  userToken: string;
  dispatchEvent: (parms: object[]) => void;
};
import TicketList from "../components/ticket/ticket-list";
import NavigationBar from "../components/navi/navigation-bar";
import LoginForm from "../components/auth/login-form";
import { User } from "@nextep/core/models/User";
import { AuthService } from "../service/AuthService";
import FormEditor from "../components/form/form-editor";
import Label from "../components/form/label";
import { PAGES, PageService } from "../service/PageService";
import { DispatchService } from "../service/DispatchService";

function MainPage(props: any) {
  const [userToken, setUserToken] = useState(() => "");

  const [page, setPage] = useState(() => PAGES.LOGIN);

  const [dispatchService, setDispatchService] = useState(
    () =>
      new DispatchService([
        new AuthService(setUserToken),
        new PageService(setPage),
      ])
  );

  return (
    <div>
      {page == PAGES.LOGIN ? (
        <LoginForm dispatchService={dispatchService} />
      ) : null}
      {page != PAGES.LOGIN ? (
        <NavigationBar dispatchService={dispatchService} />
      ) : null}
      {page == PAGES.DASHBOARD ? (
        <>
          <TicketList />
          <FormEditor />
        </>
      ) : null}
    </div>
  );
}

export default MainPage;
