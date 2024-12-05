import { UserManager } from 'oidc-client-ts';

export const userManager = new UserManager({
    authority: "https://login.solid-matrix.com",
    client_id: "3v87ekte9llecjli3b5l207u16",
    redirect_uri: "https://blog.solid-matrix.com",
    response_type: "code",
    scope: "email openid phone"
});

export async function signOutRedirect() {
    const clientId = "3v87ekte9llecjli3b5l207u16";
    const logoutUri = "https://blog.solid-matrix.com";
    const cognitoDomain = "https://login.solid-matrix.com";
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
};