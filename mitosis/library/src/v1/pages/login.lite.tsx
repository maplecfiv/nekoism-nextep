import LoginForm from "../components/auth/login-form.lite";

export default function Login(props) {
    return (
        <LoginForm dispatchService={props.dispatchService} />
    )
}
