import { Show, useState, useStore } from "@builder.io/mitosis";
import TicketList from "../components/ticket/ticket-list.lite";
import NavigationBar from "../components/navi/navigation-bar.lite";
import LoginForm from "../components/auth/login-form.lite";
import { User } from "@nextep/core/models/User";
import { AuthService } from "../service/AuthService";
import FormEditor from "../components/form/form-editor.lite";

import Label from "../components/form/label.lite";
import { PAGES, PageService } from "../service/PageService";
import { DispatchService } from "../service/DispatchService";

export type StoreType = {
    userToken: string;
    dispatchEvent: (parms: object[]) => void;
};

export default function MainPage() {
    const [userToken, setUserToken] = useState("");
    const [page, setPage] = useState(PAGES.LOGIN);

    const state = useStore({
        dispatchService: new DispatchService(
            [new AuthService(setUserToken), new PageService(setPage)],
        ),
    });

    return (
        <div>
            <Show when={page == PAGES.LOGIN}>
                <LoginForm dispatchService={state.dispatchService} />
            </Show>
            <Show when={page != PAGES.LOGIN}>
                <NavigationBar dispatchService={state.dispatchService} />
            </Show>
            <Show when={page == PAGES.DASHBOARD}>
                <TicketList />
                <FormEditor />
            </Show>
        </div>
    );
}
