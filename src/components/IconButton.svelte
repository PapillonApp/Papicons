<script lang="ts">
	export let icon: {
		name: string;
		jsx: string;
	};
	export let onCopy: () => void;

	function copyText(str: string) {
		navigator.clipboard.writeText(str).then(onCopy)
	}
</script>

<button on:click={() => copyText(icon.jsx)}>
	<img src={`/icons/${icon.name}.svg`} alt={icon.name} />
</button>

<style lang="less">
	button {
		width: 100%;
		aspect-ratio: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 2px solid rgba(205, 205, 205, 0.50);
		border-radius: 13px;
		background-color: #FFF;
		transition: .3s cubic-bezier(0, 1, .5, 1.3);

		img {
			width: 32px;
			height: 32px;
		}

		&:hover {
			scale: 1.05;
		}

		&:active {
			scale: 0.95;
		}
	}
</style>