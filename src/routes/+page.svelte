<script lang="ts">
    import { onMount } from "svelte";
    import { userManager } from "$lib/user-manager";
    let email = $state("");
    let accessToken = $state("");
    let idToken = $state("");
    let refreshToen = $state("");

    onMount(() => {
        userManager.signinCallback().then((user) => {
            email = user?.profile?.email as string;
            accessToken = user?.access_token as string;
            idToken = user?.id_token as string;
            refreshToen = user?.refresh_token as string;
        });
    });
</script>

<h1>Home Page</h1>

<div>
    Hello: <pre id="email"></pre>
    Access token:
    <pre id="access-token"></pre>
    ID token:
    <pre id="id-token"></pre>
    Refresh token:
    <pre id="refresh-token"></pre>
</div>
