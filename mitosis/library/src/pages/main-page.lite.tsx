import { onMount, Show, useState, useStore } from "@builder.io/mitosis";
import TicketList from "../components/ticket/ticket-list.lite";
import NavigationBar from "../components/navi/navigation-bar.lite";
import LoginForm from "../components/auth/login-form.lite";
import { AuthService } from "../service/AuthService";
import { TicketService } from "../service/TicketService";
import FormEditor from "../components/form/form-editor.lite";
import Form from "../components/form/form.lite";

import { PAGES, PageService } from "../service/PageService";
import { DispatchService } from "../service/DispatchService";
import { BaseService, ServiceId } from "../service/BaseService";
import { LANGUAGES } from "@nextep/core/models/Language";

export type StoreType = {
    userToken: string;
    dispatchEvent: (parms: object[]) => void;
};

export default function MainPage() {
    const [page,setPage] = useState(PAGES.LOGIN);
    const [userToken,setUserToken] = useState('');
    const [ticket,setTicket] = useState(TicketService.initTicket());
    const [language, setLanguage] = useState(LANGUAGES.EN_US)
    
    const state = useStore({
        dispatchService: new DispatchService(),
    });

    onMount(() => {
        state.dispatchService.setServices(
            new Map<ServiceId, BaseService>([[
                AuthService.SERVICE_ID,
                new AuthService(userToken, setUserToken),
            ], [
                PageService.SERVICE_ID,
                new PageService(setPage),
            ], [
                TicketService.SERVICE_ID,
                new TicketService(setTicket),
            ]]),
        );
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
                <Form
                    language={language}
                    component={ticket}
                >
                </Form>
            </Show>
        </div>
    );
}
