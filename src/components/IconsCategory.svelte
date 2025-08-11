<script lang="ts">
	import IconButton from './IconButton.svelte';

	export let category: {
		name: string;
		icon: string;
		icons: Array<{
			name: string;
			jsx: string;
		}>;
	};
	export let onCopy: () => void;
</script>

<div class="category">
	<div class="title">
		<div><img src={`/icons/${category.icon}.svg`} alt={category.name} /></div>
		<span>{category.name}</span>
	</div>
	<div class="icons">
		{#each category.icons as icon}
			<IconButton {icon} onCopy={onCopy} />
		{/each}
	</div>
</div>

<style lang="less">
	@category-bg-color: #0042DC;

	.category {
		display: flex;
		flex-direction: column;
		gap: 20px;

		.title {
			display: flex;
			align-items: center;
			gap: 10px;

			div {
				height: 32px;
				width: 32px;
				padding: 2px;
				box-sizing: border-box;
				background-color: @category-bg-color;
				mask-image: url('/category_container_mask.svg');
				mask-size: cover;

				img {
					width: 100%;
					height: 100%;
					filter: brightness(0) saturate(100%) invert(71%) sepia(35%) saturate(923%) hue-rotate(186deg) brightness(105%) contrast(103%);
				}
			}

			span {
				font-size: 28px;
				color: #3A3A3A;
				font-weight: 600;
			}
		}

		.icons {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
			gap: 12px;
		}
	}
</style>