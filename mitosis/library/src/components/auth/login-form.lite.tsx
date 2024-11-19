import { useStore } from "@builder.io/mitosis";
import { User } from "@nextep/core/models/User";
import { StoreType } from "../../pages/main-page.lite";
import { DispatchService } from "../../service/DispatchService";
import { AuthService } from "../../service/AuthService";

export type Props = {
    dispatchService: DispatchService;
};

export default function LoginForm(props: Props) {
    const state = useStore({
        setEmail(_email: string) {
            console.log(_email);
        },
        setPassword(_password: string) {
            console.log(_password);
        },
        processSubmit() {
            props.dispatchService.onMessage(
                AuthService.SERVICE_ID,
                AuthService.LOGIN,
                new Map([
                    [AuthService.KEY_USER_TOKEN, "abc123"],
                ]),
            );
        },
    });

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form
                        className="card-body"
                        onSubmit={(e) => {
                            e.preventDefault();
                        }}
                        action="#"
                    >
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                onChange={(event) => {
                                    state.setEmail(event.target.value);
                                }}
                                type="email"
                                placeholder="email"
                                className="input input-bordered"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                onChange={(event) => {
                                    state.setPassword(event.target.value);
                                }}
                                type="password"
                                placeholder="password"
                                className="input input-bordered"
                                required
                            />
                            <label className="label">
                                <a
                                    href="#"
                                    className="label-text-alt link link-hover"
                                >
                                    Forgot password?
                                </a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button
                                onClick={() => {
                                    state.processSubmit();
                                }}
                                className="btn btn-primary"
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
