import { NextResponse } from 'next/server'
import { AUTH_TYPES, AuthService } from '@nextep/core/v1/services/server/AuthService'
import { ActionResult } from '@nextep/core/v1/services/BaseService';

export async function POST(req: Request) {
    const messages = await req.json()

    let data: ActionResult = {
        isSuccess: false
    };

    switch (messages.method ?? '') {
        case AUTH_TYPES.SSO:
            data = await new AuthService().processAction(AuthService.ACTION_LOGIN, new Map<string, any>(
                [[AuthService.KEY_USER_TOKEN, `${messages.ssoId}`], [AuthService.KEY_USER_ORGANIZATION, `${messages.userOrganization}`]]
            ))
            break;
    }

    return NextResponse.redirect(`${process.env.frontend}/?a=login&s=${data.isSuccess}&t=${data.payload?.sessionToken ?? null}`)
}
