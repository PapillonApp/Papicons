<script lang="ts">
	import IconButton from './IconButton.svelte';

	export let iconCategory: {
		name: string;
		icon: string;
		icons: Array<{
			name: string;
			jsx: string;
		}>;
	}[];
	export let onCopy: () => void;
	export let searchValue: string;

	let searchResult: Array<{
		name: string;
		jsx: string;
	}> = [];

	// onValueChange is a function that will be called when the search value changes
	$: searchResult = searchIcons(searchValue);

	function searchIcons(value: string): Array<{ name: string; jsx: string }> {
		console.log('Searching icons for:', value);
		if (!value || value.trim() === '') return [];
		const result = [];
		for (const category of iconCategory) {
			for (const icon of category.icons) {
				if (icon.name.toLowerCase().includes(value.toLowerCase())) {
					result.push(icon);
				}
			}
		}
		return result;
	}
</script>

<div class="icons">
	{#each searchResult as icon}
		<IconButton {icon} onCopy={onCopy} />
	{/each}
</div>
{#if searchResult.length === 0}
	<div class="no-result">
		<h2>No result</h2>
		<p>Try searching for a different icon name or category.</p>
		<a href="#issue">
			<img src="/icons/plus.svg"
					 alt="Plus icon"
			/>
			Get started
		</a>
	</div>
{/if}

<style lang="less">
	.icons {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
		gap: 12px;
	}

	.no-result {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: calc(100vh - 300px);

		h2 {
			font-size: 32px;
			color: #3A3A3A;
			margin: 0;
			margin-bottom: 10px;
		}

		p {
			font-size: 18px;
			color: #3A3A3A;
			margin: 0;
			margin-bottom: 20px;
		}

		a {
			background-color: #0042DC;
			color: #FFF;
			border-radius: 50px;
			text-decoration: none;
			font-weight: 600;
			font-size: 13pt;
			transition: .3s cubic-bezier(0, 1, .5, 1.3);
			display: flex;
			gap: 10px;
			align-items: center;
			padding: 10px 20px 10px 16px;

			img {
				width: 24px;
				height: 24px;
				filter: invert();
			}

			&:hover {
				scale: 1.05;
			}

			&:active {
				scale: 0.95;
			}
		}
	}
</style>