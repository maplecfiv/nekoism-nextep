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

function MainPage(props: any) {
  const [userToken, setUserToken] = useState(() => "");

  const [authService, setAuthService] = useState(
    () => new AuthService(setUserToken)
  );

  return (
    <div>
      {userToken.length == 0 ? <LoginForm authService={authService} /> : null}
      {userToken.length != 0 ? (
        <>
          <NavigationBar authService={authService} />
          <TicketList />
        </>
      ) : null}
    </div>
  );
}

export default MainPage;
