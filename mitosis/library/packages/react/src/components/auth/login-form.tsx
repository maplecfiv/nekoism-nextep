"use client";
import * as React from "react";

export type Props = {
  dispatchService: DispatchService;
};
import { User } from "@nextep/core/models/User";
import { StoreType } from "../../pages/main-page";
import { DispatchService } from "../../service/DispatchService";
import { AuthService } from "../../service/AuthService";

function LoginForm(props: Props) {
  function setEmail(_email: string) {
    console.log(_email);
  }

  function setPassword(_password: string) {
    console.log(_password);
  }

  function processSubmit() {
    props.dispatchService.onMessage(
      AuthService.SERVICE_ID,
      AuthService.LOGIN,
      new Map([[AuthService.KEY_USER_TOKEN, "abc123"]])
    );
  }

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form
            action="#"
            className="card-body"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button
                className="btn btn-primary"
                onClick={(event) => {
                  processSubmit();
                }}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
