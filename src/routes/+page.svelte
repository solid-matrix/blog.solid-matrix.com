<script lang="ts">
    import { onMount } from "svelte";
    import { userManager } from "$lib/user-manager";
    let email = $state("");
    let accessToken = $state("");
    let idToken = $state("");
    let refreshToen = $state("");

    onMount(() => {
        userManager.signinCallback().then((user) => {
            console.log(user);
            email = user?.profile?.email as string;
            accessToken = user?.access_token as string;
            idToken = user?.id_token as string;
            refreshToen = user?.refresh_token as string;
        });
    });
</script>

<h1>Home Page</h1>

<div>
    <p>Hello: {email}</p>
    <p>Access token: {accessToken}</p>
    <p>ID token: {idToken}</p>
    <p>Refresh token: {refreshToen}</p>
</div>
