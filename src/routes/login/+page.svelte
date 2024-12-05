<script lang="ts">
    import { onMount } from "svelte";
    import { userManager } from "$lib/user-manager";

    onMount(async () => {
        await userManager.signinRedirect();
    });
</script>
