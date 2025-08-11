<script lang="ts">
	import Header from '../components/Header.svelte';
	import iconCategory from '../const/icons.json';
	import IconsCategory from '../components/IconsCategory.svelte';
	import Notification from '../components/Notification.svelte';
	import SearchPage from '../components/SearchPage.svelte';
	import Footer from '../components/Footer.svelte';

	let notifications: string[] = [];
	let searchValue = '';

	function addNotification() {
		const id = Math.random().toString(36).substring(2, 15);
		notifications = [...notifications, id];
	}
	
	function search(str: string) {
		searchValue = str.trim();
	}

</script>

<Header onSearch={search}/>

<main>
	{#if (searchValue.length === 0)}
		{#each iconCategory as category}
			<IconsCategory {category} onCopy={addNotification} />
		{/each}
	{:else}
		<SearchPage {iconCategory} {searchValue} onCopy={addNotification}/>
	{/if}
</main>
<div class="notifications">
	{#each notifications as _}
		<Notification/>
	{/each}
</div>
<Footer/>

<style lang="less">
	main {
		padding: 20px;
		box-sizing: border-box;
		width: 100%;
		max-width: 800px;
		display: flex;
		flex-direction: column;
		gap: 40px;
		min-height: calc(100vh - 120px);
		scroll-snap-align: start;
	}
	.notifications {
		display: flex;
		flex-direction: column;
		position: fixed;
		bottom: 20px;
		left: 0;
		width: 100%;
		height: 80px;
		align-items: center;
		justify-content: flex-end;
		gap: 10px;
		z-index: 200;
		pointer-events: none;
	}
</style>