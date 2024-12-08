<script lang="ts">
    import { onMount } from "svelte";
    import { SignIn, SignOut, GetUser } from "$lib/auth";

    let user: any = $state(undefined);

    onMount(async () => {
        user = await GetUser();
        console.log(user);
    });
</script>

<h1>Hello, {user?.profile?.email}</h1>

<button onclick={() => SignIn()}>Sign In</button>

<button onclick={() => SignOut()}>Sign Out</button>
