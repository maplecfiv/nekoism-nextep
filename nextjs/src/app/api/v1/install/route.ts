import { NextResponse } from 'next/server'
import { InitializationService } from '@nextep/core/v1/services/server/InitializationService'
import { ActionResult, BaseService } from '@nextep/core/v1/services/BaseService';
import { AUTH_TYPES, AuthService } from '@nextep/core/v1/services/server/AuthService';

export async function POST(req: Request) {
    const messages = await req.json()

    let data: ActionResult = {
        isSuccess: false
    };

    switch (messages.method ?? '') {
        case AUTH_TYPES.SSO:
            data = await new InitializationService().processAction(InitializationService.ACTION_INIT, BaseService.createArguments({ key: AuthService.KEY_USER_ORGANIZATION, value: messages.userOrganization }, { key: AuthService.KEY_USER_TOKEN, value: messages.ssoId }))
            break;
    }

    return NextResponse.json(data);
}
