"use client";
import * as React from "react";
import { useState, useEffect } from "react";

export type StoreType = {
  userToken: string;
  dispatchEvent: (parms: object[]) => void;
};
import TicketList from "../components/ticket/ticket-list";
import NavigationBar from "../components/navi/navigation-bar";
import LoginForm from "../components/auth/login-form";
import { AuthService } from "../service/AuthService";
import { TicketService } from "../service/TicketService";
import FormEditor from "../components/form/form-editor";
import Form from "../components/form/form";
import { PAGES, PageService } from "../service/PageService";
import { DispatchService } from "../service/DispatchService";
import { BaseService, ServiceId } from "../service/BaseService";
import { LANGUAGES } from "@nextep/core/models/Language";

function MainPage(props: any) {
  const [page, setPage] = useState(() => PAGES.LOGIN);

  const [userToken, setUserToken] = useState(() => "");

  const [ticket, setTicket] = useState(() => TicketService.initTicket());

  const [language, setLanguage] = useState(() => LANGUAGES.EN_US);

  const [dispatchService, setDispatchService] = useState(
    () => new DispatchService()
  );

  useEffect(() => {
    dispatchService.setServices(
      new Map<ServiceId, BaseService>([
        [AuthService.SERVICE_ID, new AuthService(userToken, setUserToken)],
        [PageService.SERVICE_ID, new PageService(setPage)],
        [TicketService.SERVICE_ID, new TicketService(setTicket)],
      ])
    );
  }, []);

  return (
    <div>
      {page == PAGES.LOGIN ? (
        <LoginForm dispatchService={dispatchService} />
      ) : null}
      {page != PAGES.LOGIN ? (
        <NavigationBar dispatchService={dispatchService} />
      ) : null}
      {page == PAGES.DASHBOARD ? (
        <Form language={language} component={ticket} />
      ) : null}
    </div>
  );
}

export default MainPage;
