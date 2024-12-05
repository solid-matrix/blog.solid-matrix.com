<script lang="ts">
    import { onMount } from "svelte";
    import { userManager } from "$lib/user-manager";

    onMount(() => {
        userManager.signinRedirect();
    });
</script>
