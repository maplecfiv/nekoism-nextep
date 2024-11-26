import * as React from "react";
import LoginForm from "../components/auth/login-form";

function Login(props: any) {
  return <LoginForm dispatchService={props.dispatchService} />;
}

export default Login;
