import { dev } from "$app/environment"

export const OidcSignInRedirectUrl = dev ?
    "http://localhost:5173/" :
    "https://blog.solid-matrix.com/";
export const OidcSignOutRedirectUrl = dev ?
    "http://localhost:5173/" :
    "https://blog.solid-matrix.com/"
    ;

export const OidcAuthority = "https://cognito-idp.ap-east-1.amazonaws.com/ap-east-1_EK7RcTeVm";
export const OidcClientId = "27l2ag3skmhoqp746lemceb25e";
export const OidcResoponseType = "code";
export const OidcScope = "email openid phone profile";
export const OidcDomain = "https://ap-east-1ek7rctevm.auth.ap-east-1.amazoncognito.com";