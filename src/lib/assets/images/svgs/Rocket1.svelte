<script lang="ts">
	interface Props {
		launching?: boolean;
	}

	let { launching }: Props = $props();
</script>

<div class={["svg-container", launching ? "launching" : ""]}>
	<svg viewBox="0 0 680 540" xmlns="http://www.w3.org/2000/svg">
		<defs>
			<radialGradient id="thrustGlow" cx="50%" cy="0%" r="100%">
				<stop offset="0%" stop-color="#f15bb5" stop-opacity="0.9" />
				<stop offset="45%" stop-color="#9a5de5" stop-opacity="0.5" />
				<stop offset="100%" stop-color="#9a5de5" stop-opacity="0" />
			</radialGradient>
		</defs>
		<style>
			@keyframes streak-v-fast {
				0% {
					opacity: 0;
					transform: translateY(0);
				}

				10% {
					opacity: 1;
				}

				90% {
					opacity: 1;
				}

				100% {
					opacity: 0;
					transform: translateY(620px);
				}
			}

			@keyframes streak-v-med {
				0% {
					opacity: 0;
					transform: translateY(0);
				}

				15% {
					opacity: 0.65;
				}

				85% {
					opacity: 0.65;
				}

				100% {
					opacity: 0;
					transform: translateY(620px);
				}
			}

			@keyframes twinkle {
				0%,
				100% {
					opacity: 0.15;
				}

				50% {
					opacity: 1;
				}
			}

			@keyframes flame-flicker {
				0%,
				100% {
					opacity: 0.95;
					transform: scaleX(1) scaleY(1);
				}

				25% {
					opacity: 1;
					transform: scaleX(1.08) scaleY(0.92);
				}

				50% {
					opacity: 0.88;
					transform: scaleX(0.9) scaleY(1.1);
				}

				75% {
					opacity: 1;
					transform: scaleX(1.05) scaleY(0.96);
				}
			}

			@keyframes glow-pulse {
				0%,
				100% {
					opacity: 0.5;
					transform: scaleX(1);
				}

				50% {
					opacity: 0.88;
					transform: scaleX(1.15);
				}
			}

			@keyframes particle-fall {
				0% {
					opacity: 1;
					transform: translate(0, 0) scale(1);
				}

				100% {
					opacity: 0;
					transform: translate(10px, 80px) scale(0);
				}
			}

			@keyframes particle-fall2 {
				0% {
					opacity: 1;
					transform: translate(0, 0) scale(1);
				}

				100% {
					opacity: 0;
					transform: translate(-12px, 72px) scale(0);
				}
			}
		</style>

		<!-- Stars -->
		<circle fill="#fee83e" cx="55" cy="50" r="1.4" style="animation: twinkle 2.8s 0.3s infinite" />
		<circle fill="#fff" cx="185" cy="22" r="1.6" style="animation: twinkle 4s 0s infinite" />
		<circle fill="#00bbfa" cx="600" cy="35" r="1.5" style="animation: twinkle 2.4s 1.1s infinite" />
		<circle fill="#fff" cx="635" cy="90" r="1.2" style="animation: twinkle 3.1s 0.5s infinite" />
		<circle
			fill="#f15bb5"
			cx="108"
			cy="140"
			r="1.3"
			style="animation: twinkle 3.7s 0.2s infinite"
		/>
		<circle fill="#fff" cx="465" cy="80" r="1.8" style="animation: twinkle 2.9s 1.4s infinite" />
		<circle fill="#fee83e" cx="20" cy="270" r="1.2" style="animation: twinkle 2.2s 0.7s infinite" />
		<circle fill="#fff" cx="660" cy="310" r="1.5" style="animation: twinkle 3.6s 0s infinite" />
		<circle fill="#00bbfa" cx="88" cy="430" r="1.3" style="animation: twinkle 3s 0.6s infinite" />
		<circle fill="#fff" cx="572" cy="415" r="1.8" style="animation: twinkle 3.9s 1s infinite" />
		<circle
			fill="#f15bb5"
			cx="310"
			cy="510"
			r="1.2"
			style="animation: twinkle 2.5s 0.3s infinite"
		/>
		<circle fill="#fff" cx="648" cy="185" r="1.5" style="animation: twinkle 3.2s 1.5s infinite" />
		<circle
			fill="#fee83e"
			cx="440"
			cy="500"
			r="1.3"
			style="animation: twinkle 2.7s 1.2s infinite"
		/>
		<circle fill="#fff" cx="238" cy="108" r="1.6" style="animation: twinkle 3.5s 0.9s infinite" />

		<!-- 4-pointed sparkles -->
		<g transform="translate(130,70)" style="animation: twinkle 3.2s 0.4s infinite">
			<path
				d="M0,-11 C1.5,-2 2,-1.5 11,0 C2,1.5 1.5,2 0,11 C-1.5,2 -2,1.5 -11,0 C-2,-1.5 -1.5,-2 0,-11Z"
				fill="#fee83e"
			/>
		</g>
		<g transform="translate(58,200)" style="animation: twinkle 2.6s 1s infinite">
			<path
				d="M0,-9 C1.3,-1.8 1.8,-1.3 9,0 C1.8,1.3 1.3,1.8 0,9 C-1.3,1.8 -1.8,1.3 -9,0 C-1.8,-1.3 -1.3,-1.8 0,-9Z"
				fill="#f15bb5"
			/>
		</g>
		<g transform="translate(620,292)" style="animation: twinkle 3s 0.7s infinite">
			<path
				d="M0,-10 C1.4,-2 2,-1.4 10,0 C2,1.4 1.4,2 0,10 C-1.4,2 -2,1.4 -10,0 C-2,-1.4 -1.4,-2 0,-10Z"
				fill="#00bbfa"
			/>
		</g>
		<g transform="translate(597,470)" style="animation: twinkle 2.9s 1.3s infinite">
			<path
				d="M0,-9 C1.3,-1.8 1.8,-1.3 9,0 C1.8,1.3 1.3,1.8 0,9 C-1.3,1.8 -1.8,1.3 -9,0 C-1.8,-1.3 -1.3,-1.8 0,-9Z"
				fill="#fee83e"
			/>
		</g>
		<g transform="translate(75,440)" style="animation: twinkle 3.4s 0.5s infinite">
			<path
				d="M0,-8 C1.2,-1.6 1.6,-1.2 8,0 C1.6,1.2 1.2,1.6 0,8 C-1.2,1.6 -1.6,1.2 -8,0 C-1.6,-1.2 -1.2,-1.6 0,-8Z"
				fill="#00bbfa"
			/>
		</g>

		<!-- Streaks far -->
		<g opacity="0.3">
			<line
				stroke="#aaccff"
				stroke-linecap="round"
				fill="none"
				x1="78"
				y1="-80"
				x2="78"
				y2="-155"
				stroke-width="0.7"
				style="animation: streak-v-med 4.5s 0s infinite linear"
			/>
			<line
				stroke="#aaccff"
				stroke-linecap="round"
				fill="none"
				x1="158"
				y1="-80"
				x2="158"
				y2="-122"
				stroke-width="0.6"
				style="animation: streak-v-med 4.1s 0.6s infinite linear"
			/>
			<line
				stroke="#aaccff"
				stroke-linecap="round"
				fill="none"
				x1="248"
				y1="-80"
				x2="248"
				y2="-132"
				stroke-width="0.7"
				style="animation: streak-v-med 4.9s 1.4s infinite linear"
			/>
			<line
				stroke="#aaccff"
				stroke-linecap="round"
				fill="none"
				x1="432"
				y1="-80"
				x2="432"
				y2="-142"
				stroke-width="0.5"
				style="animation: streak-v-med 4s 0.9s infinite linear"
			/>
			<line
				stroke="#aaccff"
				stroke-linecap="round"
				fill="none"
				x1="512"
				y1="-80"
				x2="512"
				y2="-124"
				stroke-width="0.8"
				style="animation: streak-v-med 4.7s 0.3s infinite linear"
			/>
			<line
				stroke="#aaccff"
				stroke-linecap="round"
				fill="none"
				x1="602"
				y1="-80"
				x2="602"
				y2="-138"
				stroke-width="0.6"
				style="animation: streak-v-med 3.9s 1.8s infinite linear"
			/>
		</g>
		<!-- Streaks mid -->
		<g opacity="0.55">
			<line
				stroke="#aaccff"
				stroke-linecap="round"
				fill="none"
				x1="52"
				y1="-80"
				x2="52"
				y2="-188"
				stroke-width="1.1"
				style="animation: streak-v-fast 2.8s 0s infinite linear"
			/>
			<line
				stroke="#aaccff"
				stroke-linecap="round"
				fill="none"
				x1="128"
				y1="-80"
				x2="128"
				y2="-162"
				stroke-width="1.0"
				style="animation: streak-v-fast 2.4s 0.8s infinite linear"
			/>
			<line
				stroke="#f15bb5"
				stroke-linecap="round"
				fill="none"
				x1="202"
				y1="-80"
				x2="202"
				y2="-192"
				stroke-width="1.2"
				style="animation: streak-v-fast 3.1s 0.2s infinite linear"
			/>
			<line
				stroke="#aaccff"
				stroke-linecap="round"
				fill="none"
				x1="338"
				y1="-80"
				x2="338"
				y2="-168"
				stroke-width="0.9"
				style="animation: streak-v-fast 2.5s 1.3s infinite linear"
			/>
			<line
				stroke="#9a5de5"
				stroke-linecap="round"
				fill="none"
				x1="458"
				y1="-80"
				x2="458"
				y2="-182"
				stroke-width="1.1"
				style="animation: streak-v-fast 2.7s 0.5s infinite linear"
			/>
			<line
				stroke="#aaccff"
				stroke-linecap="round"
				fill="none"
				x1="538"
				y1="-80"
				x2="538"
				y2="-170"
				stroke-width="1.2"
				style="animation: streak-v-fast 2.9s 1s infinite linear"
			/>
			<line
				stroke="#f15bb5"
				stroke-linecap="round"
				fill="none"
				x1="614"
				y1="-80"
				x2="614"
				y2="-178"
				stroke-width="1.0"
				style="animation: streak-v-fast 2.3s 1.7s infinite linear"
			/>
		</g>
		<!-- Streaks close -->
		<g opacity="0.75">
			<line
				stroke="#aaccff"
				stroke-linecap="round"
				fill="none"
				x1="28"
				y1="-80"
				x2="28"
				y2="-235"
				stroke-width="2.0"
				style="animation: streak-v-fast 1.6s 0s infinite linear"
			/>
			<line
				stroke="#f15bb5"
				stroke-linecap="round"
				fill="none"
				x1="106"
				y1="-80"
				x2="106"
				y2="-250"
				stroke-width="2.4"
				style="animation: streak-v-fast 1.3s 0.4s infinite linear"
			/>
			<line
				stroke="#aaccff"
				stroke-linecap="round"
				fill="none"
				x1="183"
				y1="-80"
				x2="183"
				y2="-228"
				stroke-width="1.8"
				style="animation: streak-v-fast 1.7s 0.9s infinite linear"
			/>
			<line
				stroke="#9a5de5"
				stroke-linecap="round"
				fill="none"
				x1="288"
				y1="-80"
				x2="288"
				y2="-242"
				stroke-width="2.2"
				style="animation: streak-v-fast 1.5s 1.5s infinite linear"
			/>
			<line
				stroke="#aaccff"
				stroke-linecap="round"
				fill="none"
				x1="392"
				y1="-80"
				x2="392"
				y2="-232"
				stroke-width="2.0"
				style="animation: streak-v-fast 1.9s 0.6s infinite linear"
			/>
			<line
				stroke="#f15bb5"
				stroke-linecap="round"
				fill="none"
				x1="478"
				y1="-80"
				x2="478"
				y2="-246"
				stroke-width="2.4"
				style="animation: streak-v-fast 1.2s 0.3s infinite linear"
			/>
			<line
				stroke="#9a5de5"
				stroke-linecap="round"
				fill="none"
				x1="558"
				y1="-80"
				x2="558"
				y2="-225"
				stroke-width="1.9"
				style="animation: streak-v-fast 2s 1.2s infinite linear"
			/>
			<line
				stroke="#aaccff"
				stroke-linecap="round"
				fill="none"
				x1="638"
				y1="-80"
				x2="638"
				y2="-240"
				stroke-width="2.1"
				style="animation: streak-v-fast 1.3s 1.8s infinite linear"
			/>
		</g>

		<!-- ROCKET -->
		<g transform="translate(340,250)" class="rocket">
			<ellipse
				cx="0"
				cy="152"
				rx="48"
				ry="70"
				fill="url(#thrustGlow)"
				style="animation: glow-pulse 0.22s infinite alternate"
			/>

			<g style="transform-origin: 0 142px; animation: flame-flicker 0.16s infinite">
				<path
					d="M -24 140  Q -33 193  -17 234  Q -7 260  0 273  Q 7 260  17 234  Q 33 193  24 140 Z"
					fill="#9a5de5"
					opacity="0.7"
				/>
				<path
					d="M -16 140  Q -22 187  -10 222  Q -3 243  0 254  Q 3 243  10 222  Q 22 187  16 140 Z"
					fill="#f15bb5"
					opacity="0.95"
				/>
				<path
					d="M  -9 140  Q -11 178   -4 207  Q -2 220  0 228  Q 2 220   4 207  Q 11 178   9 140 Z"
					fill="#fee83e"
					opacity="0.9"
				/>
				<path d="M  -4 140  Q  -4 167   0 187  Q  4 167   4 140 Z" fill="#ffffff" opacity="0.8" />
			</g>

			<circle
				cx="-12"
				cy="148"
				r="4.5"
				fill="#f15bb5"
				style="animation: particle-fall 0.9s 0s infinite"
			/>
			<circle
				cx="9"
				cy="152"
				r="3"
				fill="#9a5de5"
				style="animation: particle-fall2 0.78s 0.3s infinite"
			/>
			<circle
				cx="-4"
				cy="156"
				r="2.5"
				fill="#fee83e"
				style="animation: particle-fall 1.05s 0.5s infinite"
			/>
			<circle
				cx="8"
				cy="145"
				r="2"
				fill="#f15bb5"
				style="animation: particle-fall2 0.65s 0.1s infinite"
			/>

			<path d="M -29 126  L -43 142  L 43 142  L 29 126 Z" fill="#9a5de5" />
			<rect x="-43" y="138" width="86" height="6" rx="3" fill="#fee83e" />

			<path d="M -60 -15 L -133 126 L -60 126 L -60 52 Z" fill="#9a5de5" />
			<path d="M  60 -15 L  133 126 L  60 126 L  60 52 Z" fill="#9a5de5" />

			<path
				d="M -50 -173 C -70 -110  -70 48  -52 126 L 52 126 C 70 48  70 -110  50 -173 Z"
				fill="#9a5de5"
			/>

			<path
				d="M -50 -173 C -44 -191  -24 -212  0 -216 C 24 -212  44 -191  50 -173 Z"
				fill="#f15bb5"
			/>
			<rect x="-52" y="-179" width="104" height="10" rx="5" fill="#fee83e" />

			<rect x="-29" y="-88" width="58" height="76" rx="16" fill="#0d0a1a" />
			<rect x="-19" y="-77" width="38" height="54" rx="10" fill="#130e28" />

			<rect x="-54" y="110" width="108" height="9" rx="4" fill="#fee83e" />
		</g>
	</svg>
</div>

<style lang="scss">
	.svg-container {
		display: flex;
		align-items: center;
		justify-content: center;
		background: transparent;

		&.launching {
			.rocket {
				animation: launch 4s ease-in forwards;

				@keyframes launch {
					0% {
						transform: translate(340px, 250px);
					}

					40% {
						transform: translate(340px, -120vh);
					}

					41% {
						display: none;
						visibility: hidden;
						width: 0;
						height: 0;
						overflow: hidden;
						opacity: 0;
						transform: translate(340px, 160vh);
						animation: none;
					}

					42% {
						opacity: 1;
					}

					100% {
						transform: translate(340px, 250px);
					}
				}
			}
		}
	}

	svg {
		width: min(680px, 100vw);
		height: auto;
	}
</style>
