import { onMount, Show, useState, useStore } from "@builder.io/mitosis";
import NavigationBar from "../components/navi/navigation-bar.lite";
import LoginForm from "../components/auth/login-form.lite";
import { AuthService } from "../service/AuthService";
import { TicketService } from "../service/TicketService";
import Form from "../components/form/form.lite";

import { PAGES, PageService } from "../service/PageService";
import { DispatchService } from "../service/DispatchService";
import { LANGUAGES } from "@nextep/core/v1/models/Language";

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
        authService: new AuthService(userToken, setUserToken),
        pageService: new PageService(setPage),
        ticketService: new TicketService(setTicket),
    });

    onMount(() => {
        state.dispatchService.addService( AuthService.SERVICE_ID,state.authService);
        state.dispatchService.addService( PageService.SERVICE_ID,state.pageService);
        state.dispatchService.addService( TicketService.SERVICE_ID,state.ticketService);
    });

    return (
        <>
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
        </>
    );
}
