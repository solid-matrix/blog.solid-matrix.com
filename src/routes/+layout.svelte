<script lang="ts">
	import "../app.css";
	import { page } from "$app/stores";
	import Icon from "@iconify/svelte";

	import { SignIn, SignOut, GetUser } from "$lib/auth";
	import { onMount } from "svelte";

	let { children } = $props();
	let navOpen = $state(false);
	let profileOpen = $state(false);
	let user: any = $state(null);
	let navs = $derived([
		{ name: "home", icon: "fluent:home-24-filled", path: "/", active: $page.url.pathname == "/" },
		{ name: "posts", icon: "fluent:pen-24-filled", path: "/post", active: $page.url.pathname.startsWith("/post") },
		{ name: "projects", icon: "fluent:projection-screen-text-24-filled", path: "/project", active: $page.url.pathname.startsWith("/project") },
		{ name: "about", icon: "fluent:book-information-24-filled", path: "/about", active: $page.url.pathname.startsWith("/about") },
	]);

	onMount(async () => {
		user = await GetUser();
		console.log(user);
	});
</script>

<svelte:window
	onclick={() => {
		navOpen = false;
		profileOpen = false;
	}} />

<div class="h-screen w-screen overflow-hidden flex flex-col">
	<header class="flex-none">
		<nav class="bg-white shadow select-none">
			<div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
				<div class="relative flex h-16 justify-between">
					<div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
						<button
							onclick={(e) => {
								e.stopPropagation();
								navOpen = !navOpen;
							}}
							type="button"
							class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
							aria-controls="mobile-menu"
							aria-expanded="false">
							<span class="absolute -inset-0.5"></span>
							<span class="sr-only">Open main menu</span>
							<Icon class="{navOpen ? 'hidden' : 'block'} size-6" icon="fluent:navigation-24-filled" />
							<Icon class="{navOpen ? 'block' : 'hidden'} size-6" icon="fluent:dismiss-24-filled" />
						</button>
					</div>
					<div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
						<div class="flex shrink-0 items-center cursor-default select-none">
							<span class="text-md font-semibold text-indigo-500">Solid Matrix Blog</span>
						</div>
						<div class="hidden sm:ml-6 sm:flex sm:space-x-8">
							{#each navs as nav}
								<a
									href={nav.path}
									class="inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium {nav.active
										? 'border-indigo-500 text-gray-900'
										: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}"
									aria-current="page">
									<span class="uppercase">{nav.name}</span>
								</a>
							{/each}
						</div>
					</div>
					<div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
						<!-- <button
							type="button"
							class="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
							<span class="absolute -inset-1.5"></span>
							<span class="sr-only">View notifications</span>
							<svg class="size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
							</svg>
						</button> -->

						<!-- Profile dropdown -->

						<div class="relative ml-3">
							<div class="flex items-center gap-2">
								<button
									onclick={(e) => {
										e.stopPropagation();
										profileOpen = !profileOpen;
									}}
									type="button"
									class="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
									id="user-menu-button"
									aria-expanded="false"
									aria-haspopup="true">
									<span class="absolute -inset-1.5"></span>
									<span class="sr-only">Open user menu</span>
									<Icon class="size-8 {user ? 'text-indigo-500' : ''}" icon="fluent:person-circle-24-filled" />
								</button>
							</div>

							<!--
					  Dropdown menu, show/hide based on menu state.
		  
					  Entering: "transition ease-out duration-200"
						From: "transform opacity-0 scale-95"
						To: "transform opacity-100 scale-100"
					  Leaving: "transition ease-in duration-75"
						From: "transform opacity-100 scale-100"
						To: "transform opacity-0 scale-95"
					-->
							{#if profileOpen}
								<div
									class="absolute right-0 z-10 mt-2 min-w-48 w-fit origin-top-right rounded-md bg-white py-0 shadow-lg ring-1 ring-black/5 focus:outline-none"
									role="menu"
									aria-orientation="vertical"
									aria-labelledby="user-menu-button"
									tabindex="-1">
									{#if user}
										<span class="block px-4 py-2 text-sm text-indigo-500 font-semibold whitespace-nowrap w-full text-left border-b border-black/5"
											>{user?.profile?.email}</span>
										<a
											href="/user"
											class="block px-4 py-2 text-sm text-gray-700 whitespace-nowrap w-full text-left"
											role="menuitem"
											tabindex="-1"
											id="user-menu-item-0">Your Profile</a>
										<button
											onclick={() => SignOut()}
											class="block px-4 py-2 text-sm text-gray-700 whitespace-nowrap w-full text-left"
											role="menuitem"
											tabindex="-1"
											id="user-menu-item-2">Sign out</button>
									{:else}
										<button
											onclick={() => SignIn()}
											class="block px-4 py-2 text-sm text-gray-700 whitespace-nowrap w-full text-left"
											role="menuitem"
											tabindex="-1"
											id="user-menu-item-2">Sign In</button>
									{/if}
									<!-- Active: "bg-gray-100 outline-none", Not Active: "" -->
								</div>
							{/if}
						</div>
					</div>
				</div>
			</div>

			<!-- Mobile menu, show/hide based on menu state. -->
			{#if navOpen}
				<div class="sm:hidden" id="mobile-menu">
					<div class="space-y-1 pb-4 pt-2">
						{#each navs as nav}
							<a
								href={nav.path}
								class="block border-l-4 py-2 pl-3 pr-4 text-base font-medium {nav.active
									? 'bg-indigo-50 border-indigo-500 text-indigo-700'
									: 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'}"
								aria-current="page">
								<span class="uppercase">{nav.name}</span>
							</a>
						{/each}
					</div>
				</div>
			{/if}
		</nav>
	</header>

	<div class="flex-1 h-0">
		<main>
			<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
				{@render children()}
			</div>
		</main>
	</div>

	<footer class="flex-none bg-gray-900">
		<div class="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
			<!-- <div class="flex justify-center gap-x-6 md:order-2">
				<a href="/" class="text-gray-400 hover:text-gray-300">
					<span class="sr-only">Facebook</span>
					<svg class="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
						<path
							fill-rule="evenodd"
							d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
							clip-rule="evenodd" />
					</svg>
				</a>
				<a href="/" class="text-gray-400 hover:text-gray-300">
					<span class="sr-only">Instagram</span>
					<svg class="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
						<path
							fill-rule="evenodd"
							d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
							clip-rule="evenodd" />
					</svg>
				</a>
				<a href="/" class="text-gray-400 hover:text-gray-300">
					<span class="sr-only">X</span>
					<svg class="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
						<path
							d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
					</svg>
				</a>
				<a href="/" class="text-gray-400 hover:text-gray-300">
					<span class="sr-only">GitHub</span>
					<svg class="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
						<path
							fill-rule="evenodd"
							d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
							clip-rule="evenodd" />
					</svg>
				</a>
				<a href="/" class="text-gray-400 hover:text-gray-300">
					<span class="sr-only">YouTube</span>
					<svg class="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
						<path
							fill-rule="evenodd"
							d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
							clip-rule="evenodd" />
					</svg>
				</a>
			</div> -->
			<p class="mt-8 text-center text-sm/6 text-gray-400 md:order-1 md:mt-0">&copy; 2024 solid-matrix.com All rights reserved.</p>
		</div>
	</footer>
</div>
