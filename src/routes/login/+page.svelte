<script lang="ts">
    import { userManager } from "$lib/user-manager";

    $effect(() => {
        userManager.signinRedirect();
    });
</script>
