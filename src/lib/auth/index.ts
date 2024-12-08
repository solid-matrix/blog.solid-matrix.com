import { User, UserManager } from 'oidc-client-ts';
import *as Consts from '$lib/consts';

export const userManager = new UserManager({
    authority: Consts.OidcAuthority,
    client_id: Consts.OidcClientId,
    redirect_uri: Consts.OidcSignInRedirectUrl,
    response_type: Consts.OidcResoponseType,
    scope: Consts.OidcScope,
});

export async function SignOut(redirectUrl: string | undefined = undefined) {
    await userManager.removeUser();
    const clientId = Consts.OidcClientId;
    const logoutUri = redirectUrl ?? Consts.OidcSignOutRedirectUrl;
    const OidcDomain = Consts.OidcDomain;
    window.location.href = `${OidcDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
};

export async function SignIn() {
    await userManager.signinRedirect();
}


async function FetchUser(): Promise<User | undefined> {
    try {
        let user = await userManager.signinCallback();
        if (user) {
            userManager.storeUser(user);
            return user;
        }
        return undefined;
    } catch {
        return undefined;
    }
}

export async function GetUser(): Promise<User | undefined> {
    let user: User | undefined | null;

    user = await userManager.getUser();
    if (user) return user;

    user = await FetchUser();
    if (user) return user;

    return undefined;
}

export async function GetRequiredUser(): Promise<User | undefined> {
    let user = await GetUser();
    if (user) return user;
    await SignIn();
}