import { onMount, Show, useState, useStore } from "@builder.io/mitosis";
import NavigationBar from "../components/navi/navigation-bar.lite";
import { AuthService } from "@nextep/core/v1/services/client/AuthService";
import { TicketService } from "@nextep/core/v1/services/client/TicketService";
import Form from "../components/form/form.lite";
import LoadingPage from "./loading-page.lite";

import { PAGES, PageService } from "@nextep/core/v1/services/client/PageService";
import { DispatchService } from "@nextep/core/v1/services/client/DispatchService";
import { LANGUAGES } from "@nextep/core/v1/models/Language";
import UnauthorizedPage from "./unauthorized-page.lite";
import FormEditorPage from "./form-editor-page.lite";
import { BaseService } from "@nextep/core/v1/services/BaseService";
import DashboardPage from "./dashbaord-page.lite";

export default function MainPage(props) {
    const [page, setPage] = useState(PAGES.LOADING);
    const [userToken, setUserToken] = useState('');
    const [ticket, setTicket] = useState(TicketService.initTicket());
    const [language, setLanguage] = useState(LANGUAGES.EN_US)

    const state = useStore({
        dispatchService: new DispatchService(),
        searchParams: props.searchParams
    });

    onMount(async () => {
        if (!state.searchParams.get('t')) {
            state.dispatchService.onMessage(PageService.SERVICE_ID, PageService.ROUTE_TO_PAGE, BaseService.createArguments({ key: PageService.PAGE_KEY, value: PAGES.UNAUTHORIZED }))
            return;
        }

        state.dispatchService.addService(AuthService.SERVICE_ID, new AuthService(state.searchParams.get('t'), setUserToken));
        state.dispatchService.addService(PageService.SERVICE_ID, new PageService(setPage));
        state.dispatchService.addService(TicketService.SERVICE_ID, new TicketService(setTicket));


        state.dispatchService.onMessage(PageService.SERVICE_ID, PageService.ROUTE_TO_PAGE, BaseService.createArguments({ key: PageService.PAGE_KEY, value: PAGES.DASHBOARD }))

    });

    return (
        <>
            <Show when={page == PAGES.LOADING}>
                <LoadingPage/>
            </Show>
            <Show when={page == PAGES.UNAUTHORIZED}>
                <UnauthorizedPage />
            </Show>
            <Show when={page != PAGES.UNAUTHORIZED && page != PAGES.LOADING}>
                <NavigationBar dispatchService={state.dispatchService} />
                <Show when={page == PAGES.DASHBOARD}>
                    <DashboardPage
                        language={language}
                        component={ticket}
                    >
                    </DashboardPage>
                </Show>
                <Show when={page == PAGES.START_WORKFLOW}>
                    <Form
                        language={language}
                        component={ticket}
                    >
                    </Form>
                </Show>
                <Show when={page == PAGES.FORM_DESIGNER}>
                    <FormEditorPage />
                </Show>
            </Show>
        </>
    );
}
