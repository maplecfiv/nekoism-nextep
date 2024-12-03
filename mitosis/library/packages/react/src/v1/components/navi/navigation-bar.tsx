"use client";
import * as React from "react";
import { useState } from "react";

export type Props = {
  dispatchService: DispatchService;
};
import { AuthService } from "@nextep/core/v1/services/client/AuthService";
import { DispatchService } from "@nextep/core/v1/services/client/DispatchService";
import {
  PAGES,
  PageService,
} from "@nextep/core/v1/services/client/PageService";

function NavigationBar(props: Props) {
  const [showAccountActions, setShowAccountActions] = useState(() => false);

  const [showMobileMenu, setShowMobileMenu] = useState(() => false);

  function toggleAccountActions() {
    setShowAccountActions(!showAccountActions);
  }

  function toggleMobileMenu() {
    setShowMobileMenu(!showMobileMenu);
  }

  async function logout() {
    await props.dispatchService.onMessage(
      AuthService.SERVICE_ID,
      AuthService.ACTION_LOGOUT
    );
  }

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div role="button" className="btn btn-ghost lg:hidden" tabIndex={0}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            tabIndex={0}
          >
            <li>
              <a
                onClick={(event) => {
                  const args = new Map<string, any>();
                  args.set(PageService.PAGE_KEY, PAGES.START_WORKFLOW);
                  props.dispatchService.onMessage(
                    PageService.SERVICE_ID,
                    PageService.ROUTE_TO_PAGE,
                    args
                  );
                }}
              >
                #page.startWorkflow
              </a>
            </li>
            <li>
              <a>Parent</a>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a
                    onClick={(event) => {
                      const args = new Map<string, any>();
                      args.set(PageService.PAGE_KEY, PAGES.FORM_DESIGNER);
                      props.dispatchService.onMessage(
                        PageService.SERVICE_ID,
                        PageService.ROUTE_TO_PAGE,
                        args
                      );
                    }}
                  >
                    #page.formEditor.title
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a
                onClick={(event) => {
                  const args = new Map<string, any>();
                  args.set(PageService.PAGE_KEY, PAGES.FORM_DESIGNER);
                  props.dispatchService.onMessage(
                    PageService.SERVICE_ID,
                    PageService.ROUTE_TO_PAGE,
                    args
                  );
                }}
              >
                #page.formEditor.title
              </a>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">Ticket</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a
              onClick={(event) => {
                const args = new Map<string, any>();
                args.set(PageService.PAGE_KEY, PAGES.START_WORKFLOW);
                props.dispatchService.onMessage(
                  PageService.SERVICE_ID,
                  PageService.ROUTE_TO_PAGE,
                  args
                );
              }}
            >
              #page.startWorkflow
            </a>
          </li>
          <li>
            <details>
              <summary>Parent</summary>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a
                    onClick={(event) => {
                      const args = new Map<string, any>();
                      args.set(PageService.PAGE_KEY, PAGES.FORM_DESIGNER);
                      props.dispatchService.onMessage(
                        PageService.SERVICE_ID,
                        PageService.ROUTE_TO_PAGE,
                        args
                      );
                    }}
                  >
                    #page.formEditor.title
                  </a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <a
              onClick={(event) => {
                const args = new Map<string, any>();
                args.set(PageService.PAGE_KEY, PAGES.FORM_DESIGNER);
                props.dispatchService.onMessage(
                  PageService.SERVICE_ID,
                  PageService.ROUTE_TO_PAGE,
                  args
                );
              }}
            >
              #page.formEditor.title
            </a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <a
          className="btn"
          onClick={async (event) => {
            await logout();
          }}
        >
          Logout
        </a>
      </div>
    </div>
  );
}

export default NavigationBar;
