<script lang="ts">
	import { onMount } from 'svelte';
	import Sparkles from './Sparkles.svelte';
	import ArrowDown from './ArrowDown.svelte';

	export let onSearch: (value: string) => void;

	const initialHeaderHeight = 420;

	let patternOpacity = 1;
	let patternBlur = 0;
	let heroScale = 1;
	let heroOpacity = 1;
	let heroBlur = 0;
	let searchOpacity = 0;
	let searchBlur = 10;
	let searchScale = 0;

	onMount(() => {
		window.addEventListener('scroll', () => {
			patternOpacity = Math.max(1 - (window.scrollY  * 2) / initialHeaderHeight, 0);
			patternBlur = window.scrollY / initialHeaderHeight * 20;
			heroScale = Math.max(1 - window.scrollY / initialHeaderHeight, 0.5);
			heroOpacity = Math.max(1 -( window.scrollY  * 4) / initialHeaderHeight, 0);
			heroBlur = window.scrollY / initialHeaderHeight * 40;
			searchOpacity = Math.min(window.scrollY / initialHeaderHeight * 2, 1);
			searchBlur = 10 - window.scrollY / initialHeaderHeight * 20;
			searchScale = Math.min(window.scrollY / initialHeaderHeight * 0.2 + 0.9, 1);
		});
	});


</script>

<svg class="svg">
	<clipPath id="my-clip-path" clipPathUnits="objectBoundingBox">
		<path d="M1,0 V1 C0.867,0.98,0.692,0.967,0.5,0.967 C0.308,0.967,0.133,0.98,0,1 V0 H1"></path>
	</clipPath>
</svg>

<nav>
	<header>
		<div class="pattern"
				 style="opacity: calc({patternOpacity} / 5);filter: blur({patternBlur}px);"
		/>
		<div
			class="hero"
			style="transform: scale({heroScale});opacity: {heroOpacity};filter: blur({heroBlur}px);"
		>
			<img src="/papicons_logo.svg"
					 alt="Papicons"
			/>
			<div class="button_container">
				<a href="#github">
					<Sparkles color="#0042DC" size="24" />
					Get started
				</a>
				<a href="#download" class="secondary">
					<ArrowDown color="#FFF" size="24" />
					Download
				</a>
			</div>
		</div>
		<div class="search_container" style="opacity: {searchOpacity};filter: blur({searchBlur}px);scale: {searchScale};">
			<div>
				<img src="/icons/search.svg" alt="Search icon"/>
				<input type="text" placeholder="Search icons..." oninput={e => {
					onSearch(e.target!.value)
				}} />
			</div>
		</div>
	</header>
</nav>

<style lang="less">
	@header-bg-color: #0042DC;
	@body-bg-color: #FFF;
	@header-height: 420px;

	.svg {
		position: absolute;
		width: 0;
		height: 0;
	}

	nav {
		position: sticky;
		top: -305px;
		left: 0;
		width: 100vw;
		height: @header-height;
		background-color: @header-bg-color;
		clip-path: url(#my-clip-path);
		overflow: hidden;
		z-index: 100;
	}

	header {
		position: relative;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.hero {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		gap: 30px;
		align-items: center;
		justify-content: center;
	}

	.search_container {
		position: absolute;
		bottom: 15px;
		width: 100%;
		height: 100px;
		display: flex;
		flex-direction: column;
		gap: 30px;
		align-items: center;
		justify-content: center;
		padding: 20px;
		box-sizing: border-box;
		max-width: 800px;
	}

	.search_container div {
		width: 100%;
		height: 50px;
		background-color: #FFFFFF33;
		border: 1px solid #FFFFFF33;
		color: @body-bg-color;
		border-radius: 50px;
		display: flex;
		align-items: center;
	}
	.search_container div img {
		width: 30px;
		height: 30px;
		margin-left: 20px;
		filter: invert(1);
	}
	.search_container div input {
		width: 100%;
		height: 100%;
		background-color: transparent;
		border: none;
		color: @body-bg-color;
		font-size: 16px;
		padding-left: 10px;
		outline: none;
	}

	.search_container div input::placeholder {
		color: @body-bg-color;
		opacity: 0.5;
	}

	.pattern {
		position: fixed;
		background-image: url('/pattern.png');
		background-size: 1200px;
		top: 0;
		left: 0;
		width: 100%;
		height: @header-height;
		opacity: 0.1;
		mask: radial-gradient(100% 100% at 50% 0%, #000 0%, #0000 100%);
		z-index: -1;
		pointer-events: none;
	}

	.button_container {
		display: flex;
		gap: 10px;
		align-items: center;
		height: 50px;
	}

	.button_container a {
		background-color: @body-bg-color;
		color: @header-bg-color;
		border-radius: 50px;
		text-decoration: none;
		font-weight: 600;
		font-size: 13pt;
		transition: .3s cubic-bezier(0, 1, .5, 1.3);
		display: flex;
		gap: 5px;
		align-items: center;
		padding: 10px 20px 10px 16px;
	}

	.button_container a.secondary {
		background-color: #FFFFFF33;
		border: 1px solid #FFFFFF33;
		color: @body-bg-color;
	}

	a:hover {
		scale: 1.05;
		padding: 11px 25px 11px 20px;
	}

	a:active {
		scale: 0.95;
	}
</style>