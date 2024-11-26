"use client";
import * as React from "react";
import { useState, useEffect } from "react";

export type StoreType = {
  userToken: string;
  dispatchEvent: (parms: object[]) => void;
};
import NavigationBar from "../components/navi/navigation-bar";
import LoginForm from "../components/auth/login-form";
import { AuthService } from "../service/AuthService";
import { TicketService } from "../service/TicketService";
import Form from "../components/form/form";
import { PAGES, PageService } from "../service/PageService";
import { DispatchService } from "../service/DispatchService";
import { LANGUAGES } from "@nextep/core/v1/models/Language";

function MainPage(props: any) {
  const [page, setPage] = useState(() => PAGES.LOGIN);

  const [userToken, setUserToken] = useState(() => "");

  const [ticket, setTicket] = useState(() => TicketService.initTicket());

  const [language, setLanguage] = useState(() => LANGUAGES.EN_US);

  const [dispatchService, setDispatchService] = useState(
    () => new DispatchService()
  );

  const [authService, setAuthService] = useState(
    () => new AuthService(userToken, setUserToken)
  );

  const [pageService, setPageService] = useState(
    () => new PageService(setPage)
  );

  const [ticketService, setTicketService] = useState(
    () => new TicketService(setTicket)
  );

  useEffect(() => {
    dispatchService.addService(AuthService.SERVICE_ID, authService);
    dispatchService.addService(PageService.SERVICE_ID, pageService);
    dispatchService.addService(TicketService.SERVICE_ID, ticketService);
  }, []);

  return (
    <>
      {page == PAGES.LOGIN ? (
        <LoginForm dispatchService={dispatchService} />
      ) : null}
      {page != PAGES.LOGIN ? (
        <NavigationBar dispatchService={dispatchService} />
      ) : null}
      {page == PAGES.DASHBOARD ? (
        <Form language={language} component={ticket} />
      ) : null}
    </>
  );
}

export default MainPage;
