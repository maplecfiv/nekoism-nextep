"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import NavigationBar from "../components/navi/navigation-bar";
import { AuthService } from "@nextep/core/v1/services/client/AuthService";
import { TicketService } from "@nextep/core/v1/services/client/TicketService";
import Form from "../components/form/form";
import LoadingPage from "./loading-page";
import {
  PAGES,
  PageService,
} from "@nextep/core/v1/services/client/PageService";
import { DispatchService } from "@nextep/core/v1/services/client/DispatchService";
import { LANGUAGES } from "@nextep/core/v1/models/Language";
import UnauthorizedPage from "./unauthorized-page";
import FormEditorPage from "./form-editor-page";
import { BaseService } from "@nextep/core/v1/services/BaseService";
import DashboardPage from "./dashbaord-page";

function MainPage(props: any) {
  const [page, setPage] = useState(() => PAGES.LOADING);

  const [userToken, setUserToken] = useState(() => "");

  const [ticket, setTicket] = useState(() => TicketService.initTicket());

  const [language, setLanguage] = useState(() => LANGUAGES.EN_US);

  const [dispatchService, setDispatchService] = useState(
    () => new DispatchService()
  );

  const [searchParams, setSearchParams] = useState(() => props.searchParams);

  useEffect(() => {
    if (!searchParams.get("t")) {
      dispatchService.onMessage(
        PageService.SERVICE_ID,
        PageService.ROUTE_TO_PAGE,
        BaseService.createArguments({
          key: PageService.PAGE_KEY,
          value: PAGES.UNAUTHORIZED,
        })
      );
      return;
    }
    dispatchService.addService(
      AuthService.SERVICE_ID,
      new AuthService(searchParams.get("t"), setUserToken)
    );
    dispatchService.addService(
      PageService.SERVICE_ID,
      new PageService(setPage)
    );
    dispatchService.addService(
      TicketService.SERVICE_ID,
      new TicketService(setTicket)
    );
    dispatchService.onMessage(
      PageService.SERVICE_ID,
      PageService.ROUTE_TO_PAGE,
      BaseService.createArguments({
        key: PageService.PAGE_KEY,
        value: PAGES.DASHBOARD,
      })
    );
  }, []);

  return (
    <>
      {page == PAGES.LOADING ? <LoadingPage /> : null}
      {page == PAGES.UNAUTHORIZED ? <UnauthorizedPage /> : null}
      {page != PAGES.UNAUTHORIZED && page != PAGES.LOADING ? (
        <>
          <NavigationBar dispatchService={dispatchService} />
          {page == PAGES.DASHBOARD ? (
            <DashboardPage language={language} component={ticket} />
          ) : null}
          {page == PAGES.START_WORKFLOW ? (
            <Form language={language} component={ticket} />
          ) : null}
          {page == PAGES.FORM_DESIGNER ? <FormEditorPage /> : null}
        </>
      ) : null}
    </>
  );
}

export default MainPage;
