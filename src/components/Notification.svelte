<div class="height">
<div class="notification">
	<img src="/icons/check.svg" alt="Checkmark" />
	<p>Copied !</p>
</div>
</div>

<style lang="less">
	@keyframes notification {
		from {
			width: 60px;
			scale: 0.5;
			opacity: 0;
			filter: blur(10px);
			transform: translateY(-40px);
		}
		10% {
			width: 60px;
			scale: 1;
			filter: blur(0px);
			opacity: 1;
			transform: translateY(0px);
		}
		20% {
			width: 160px;
		}
		90% {
			width: 160px;
			opacity: 1;
			filter: blur(0px);
		}
		100% {
			width: 60px;
			opacity: 0;
			filter: blur(2px);
		}
	}

	@keyframes height_animation {
		from {
			height: 0px;
		}
		to {
			height: 60px;
		}
	}


	.height{
		animation: height_animation 0.5s cubic-bezier(0, 0.5, .5, 1.1) forwards;
	}

	.notification {
		height: 60px;
		background-color: #00BA2F;
		color: #FFF;
		border-radius: 500px;
		z-index: 1000;
		display: flex;
		animation: notification 3s cubic-bezier(0, 0.5, .5, 1.1) forwards;
		align-items: center;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

		img {
			width: 30px;
			height: 30px;
			filter: invert();
			padding: 15px;
		}
		p {
			margin: 0;
			font-size: 20px;
			font-weight: 600;
			width: 300px;
			overflow: hidden;
			white-space: nowrap;
		}
	}
</style>