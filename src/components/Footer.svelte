<footer>
	<div class="tom">
		<p>Designed with</p>
		<img src="/icons/heart.svg" alt="love"/>
		<p>by <a href="https://tomthings.fr" target="_blank">Tom Things</a></p>
	</div>
	<div class="remy">
		<p>Developed with</p>
		<img src="/icons/sparkles.svg" alt="magic"/>
		<p>by <a href="https://github.com/godetremy/" target="_blank">Godet Rémy</a></p>
	</div>
</footer>

<style lang="less">
	@keyframes heartbeat {
		0% {
			transform: scale(1);
		}
		20% {
			transform: scale(1.1);
		}
		40% {
			transform: scale(1);
		}
		60% {
			transform: scale(1.1);
		}
		100% {
			transform: scale(1);
		}
	}

	@keyframes sparkles {
		0% {
			transform: scale(1) rotate(0deg);
		}
		50% {
			transform: scale(1.1) rotate(10deg);
		}
		100% {
			transform: scale(1) rotate(0deg);
		}
	}

	footer {
		width: 100%;
		background-color: #00000005;
		border-top: 1px solid rgba(0, 0, 0, 0.1);
		padding: 20px;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 2px;

		div {
			display: flex;
			justify-content: center;
			align-items: center;
			gap: 5px;
			opacity: 1;

			img {
				transition: filter 0.3s ease, opacity 0.3s ease;
			}

			p {
				font-size: 14px;
				margin: 0;
				color: #666;

				a {
					color: #666;
					text-decoration: none;
				}
			}
			img {
				opacity: 0.6;
			}
		}

		.tom:hover {
			img {
				animation: heartbeat 1s infinite;
				opacity: 1;
				filter: brightness(0) saturate(100%) invert(30%) sepia(100%) saturate(1175%) hue-rotate(339deg) brightness(80%) contrast(101%);
			}

			a {
				color: #C53424;

				&:hover {
					text-decoration: underline;
				}
			}
		}

		.remy:hover {
			img {
				animation: sparkles 1s ease-in-out infinite;
				opacity: 1;
				filter: brightness(0) saturate(100%) invert(85%) sepia(46%) saturate(2556%) hue-rotate(357deg) brightness(99%) contrast(103%);
			}

			a {
				color: #FFCC00;

				&:hover {
					text-decoration: underline;
				}
			}
		}
	}
</style>