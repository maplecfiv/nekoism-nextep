import { Show, useState, useStore } from '@builder.io/mitosis';
import TicketList from '../components/ticket/ticket-list.lite';
import NavigationBar from '../components/navi/navigation-bar.lite';
import LoginForm from '../components/auth/login-form.lite';
import { User } from '@nextep/core/models/User'
import { AuthService } from '../service/AuthService';
import FormEditor from '../components/form/form-editor.lite';

export type StoreType = {
    userToken: string,
    dispatchEvent: (parms: object[]) => void
}

export default function MainPage() {

    const [userToken, setUserToken] = useState('');

    const state = useStore({
        authService : new AuthService(setUserToken) 
    })

    return (
        <div>
            <Show when={userToken.length == 0}>
                <LoginForm authService={state.authService} />
            </Show>
            <Show when={userToken.length != 0}>
                <NavigationBar authService={state.authService}  />
                <TicketList />
                <FormEditor/>
            </Show>
        </div>
    );
}