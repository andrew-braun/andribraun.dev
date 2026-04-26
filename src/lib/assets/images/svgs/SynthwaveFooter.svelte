<!--
  SynthwaveFooter.svelte
  
  A themeable SVG footer scene. Dark mode renders a synthwave twilight beach;
  light mode renders a bright tropical daytime beach. All colors driven by
  CSS custom properties so the same SVG geometry serves both themes.
  
  Usage:
    <SynthwaveFooter />
  
  Theming: define [data-theme="light"] on <html> or any ancestor to switch.
  Defaults to dark (synthwave night).
-->

<div class="footer-wrap">
	<svg
		viewBox="0 0 1920 320"
		xmlns="http://www.w3.org/2000/svg"
		preserveAspectRatio="xMidYMid slice"
		aria-hidden="true"
	>
		<defs>
			<!-- Sky gradient: 8 stops, theme-driven -->
			<linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
				<stop offset="0%" stop-color="var(--sw-sky-0)" />
				<stop offset="18%" stop-color="var(--sw-sky-1)" />
				<stop offset="36%" stop-color="var(--sw-sky-2)" />
				<stop offset="54%" stop-color="var(--sw-sky-3)" />
				<stop offset="68%" stop-color="var(--sw-sky-4)" />
				<stop offset="80%" stop-color="var(--sw-sky-5)" />
				<stop offset="91%" stop-color="var(--sw-sky-6)" />
				<stop offset="100%" stop-color="var(--sw-sky-7)" />
			</linearGradient>

			<!-- Soft horizon glow -->
			<radialGradient id="horizonGlow" cx="50%" cy="100%" r="60%">
				<stop
					offset="0%"
					stop-color="var(--sw-glow-inner)"
					stop-opacity="var(--sw-glow-opacity-inner)"
				/>
				<stop
					offset="22%"
					stop-color="var(--sw-glow-mid)"
					stop-opacity="var(--sw-glow-opacity-mid)"
				/>
				<stop
					offset="55%"
					stop-color="var(--sw-glow-outer)"
					stop-opacity="var(--sw-glow-opacity-outer)"
				/>
				<stop offset="100%" stop-color="var(--sw-glow-fade)" stop-opacity="0" />
			</radialGradient>

			<!-- Sun fill -->
			<linearGradient id="sunFill" x1="0" y1="0" x2="0" y2="1">
				<stop offset="0%" stop-color="var(--sw-sun-0)" />
				<stop offset="30%" stop-color="var(--sw-sun-1)" />
				<stop offset="65%" stop-color="var(--sw-sun-2)" />
				<stop offset="100%" stop-color="var(--sw-sun-3)" />
			</linearGradient>

			<!-- Clip to sun circle for scan lines -->
			<clipPath id="sunClip">
				<circle cx="960" cy="194" r="86" />
			</clipPath>

			<!-- Clip above horizon -->
			<clipPath id="skyClip">
				<rect x="0" y="0" width="1920" height="194" />
			</clipPath>

			<!-- Ocean -->
			<linearGradient id="oceanGrad" x1="0" y1="0" x2="0" y2="1">
				<stop offset="0%" stop-color="var(--sw-ocean-0)" />
				<stop offset="35%" stop-color="var(--sw-ocean-1)" />
				<stop offset="100%" stop-color="var(--sw-ocean-2)" />
			</linearGradient>

			<!-- Sun reflection -->
			<radialGradient id="reflectGrad" cx="50%" cy="0%" r="100%" fx="50%" fy="0%">
				<stop
					offset="0%"
					stop-color="var(--sw-reflect-0)"
					stop-opacity="var(--sw-reflect-opacity-0)"
				/>
				<stop
					offset="45%"
					stop-color="var(--sw-reflect-1)"
					stop-opacity="var(--sw-reflect-opacity-1)"
				/>
				<stop offset="100%" stop-color="var(--sw-reflect-2)" stop-opacity="0" />
			</radialGradient>

			<!-- Sand -->
			<linearGradient id="sandGrad" x1="0" y1="0" x2="0" y2="1">
				<stop offset="0%" stop-color="var(--sw-sand-0)" />
				<stop offset="100%" stop-color="var(--sw-sand-1)" />
			</linearGradient>

			<!-- Star glow filter -->
			<filter id="starGlow" x="-300%" y="-300%" width="700%" height="700%">
				<feGaussianBlur stdDeviation="2.8" result="blur" />
				<feMerge>
					<feMergeNode in="blur" />
					<feMergeNode in="SourceGraphic" />
				</feMerge>
			</filter>

			<!-- Fade the top edge into transparency so the sky blends into the page -->
			<linearGradient id="topFadeGrad" x1="0" y1="0" x2="0" y2="1">
				<stop offset="0%" stop-color="hsl(0deg 0% 100%)" stop-opacity="0" />
				<stop offset="12%" stop-color="hsl(0deg 0% 100%)" stop-opacity="0.76" />
				<stop offset="26%" stop-color="hsl(0deg 0% 100%)" stop-opacity="1" />
				<stop offset="100%" stop-color="hsl(0deg 0% 100%)" stop-opacity="1" />
			</linearGradient>
			<mask id="topFadeMask" maskUnits="userSpaceOnUse" x="0" y="0" width="1920" height="320">
				<rect x="0" y="0" width="1920" height="320" fill="url(#topFadeGrad)" />
			</mask>
		</defs>

		<g mask="url(#topFadeMask)">
			<!-- ═══ SKY BASE ═══ -->
			<rect x="0" y="0" width="1920" height="320" fill="url(#skyGrad)" />

			<!-- ═══ STARS — visible only in dark mode (opacity controlled by var) ═══ -->
			<g filter="url(#starGlow)" style="opacity: var(--sw-stars-opacity);">
				<!-- Static white stars -->
				<g fill="var(--sw-star-base)">
					<circle cx="55" cy="14" r="2.2" opacity="0.9" />
					<circle cx="195" cy="8" r="1.8" opacity="0.8" />
					<circle cx="370" cy="22" r="2.5" opacity="0.88" />
					<circle cx="560" cy="11" r="2.0" opacity="0.82" />
					<circle cx="720" cy="28" r="1.9" opacity="0.75" />
					<circle cx="910" cy="7" r="2.3" opacity="0.9" />
					<circle cx="1090" cy="19" r="1.8" opacity="0.78" />
					<circle cx="1270" cy="12" r="2.6" opacity="0.88" />
					<circle cx="1445" cy="25" r="2.0" opacity="0.82" />
					<circle cx="1630" cy="8" r="2.2" opacity="0.9" />
					<circle cx="1810" cy="18" r="1.9" opacity="0.75" />
					<circle cx="128" cy="44" r="2.1" opacity="0.82" />
					<circle cx="290" cy="52" r="1.8" opacity="0.74" />
					<circle cx="475" cy="36" r="2.4" opacity="0.88" />
					<circle cx="648" cy="57" r="1.9" opacity="0.78" />
					<circle cx="830" cy="41" r="2.2" opacity="0.84" />
					<circle cx="1010" cy="60" r="2.0" opacity="0.76" />
					<circle cx="1180" cy="45" r="2.3" opacity="0.88" />
					<circle cx="1355" cy="54" r="1.8" opacity="0.78" />
					<circle cx="1525" cy="39" r="2.4" opacity="0.84" />
					<circle cx="1700" cy="62" r="2.1" opacity="0.76" />
					<circle cx="1880" cy="47" r="1.9" opacity="0.82" />
					<circle cx="70" cy="72" r="1.9" opacity="0.76" />
					<circle cx="240" cy="80" r="2.2" opacity="0.84" />
					<circle cx="420" cy="66" r="1.8" opacity="0.74" />
					<circle cx="600" cy="87" r="2.5" opacity="0.88" />
					<circle cx="778" cy="74" r="2.0" opacity="0.78" />
					<circle cx="1135" cy="76" r="1.9" opacity="0.76" />
					<circle cx="1315" cy="84" r="2.6" opacity="0.88" />
					<circle cx="1490" cy="69" r="2.1" opacity="0.80" />
					<circle cx="1665" cy="92" r="2.0" opacity="0.82" />
					<circle cx="1845" cy="78" r="1.8" opacity="0.74" />
				</g>

				<!-- Twinkling stars — cyan -->
				<circle cx="310" cy="31" r="2.8" fill="var(--sw-star-cyan)" opacity="0.95">
					<animate
						attributeName="opacity"
						values="0.95;0.12;0.95"
						dur="3.2s"
						repeatCount="indefinite"
					/>
					<animate attributeName="r" values="2.8;1.1;2.8" dur="3.2s" repeatCount="indefinite" />
				</circle>
				<circle cx="940" cy="51" r="2.6" fill="var(--sw-star-cyan)" opacity="0.9">
					<animate
						attributeName="opacity"
						values="0.9;0.1;0.9"
						dur="4.8s"
						repeatCount="indefinite"
						begin="1.3s"
					/>
					<animate
						attributeName="r"
						values="2.6;1.0;2.6"
						dur="4.8s"
						repeatCount="indefinite"
						begin="1.3s"
					/>
				</circle>
				<circle cx="1580" cy="26" r="3.0" fill="var(--sw-star-cyan)" opacity="0.9">
					<animate
						attributeName="opacity"
						values="0.9;0.12;0.9"
						dur="3.9s"
						repeatCount="indefinite"
						begin="2.6s"
					/>
					<animate
						attributeName="r"
						values="3.0;1.2;3.0"
						dur="3.9s"
						repeatCount="indefinite"
						begin="2.6s"
					/>
				</circle>
				<circle cx="152" cy="62" r="2.4" fill="var(--sw-star-cyan)" opacity="0.88">
					<animate
						attributeName="opacity"
						values="0.88;0.1;0.88"
						dur="5.5s"
						repeatCount="indefinite"
						begin="0.7s"
					/>
					<animate
						attributeName="r"
						values="2.4;0.9;2.4"
						dur="5.5s"
						repeatCount="indefinite"
						begin="0.7s"
					/>
				</circle>

				<!-- Twinkling stars — pink -->
				<circle cx="680" cy="19" r="2.7" fill="var(--sw-star-pink)" opacity="0.92">
					<animate
						attributeName="opacity"
						values="0.92;0.12;0.92"
						dur="4.2s"
						repeatCount="indefinite"
						begin="3.1s"
					/>
					<animate
						attributeName="r"
						values="2.7;1.1;2.7"
						dur="4.2s"
						repeatCount="indefinite"
						begin="3.1s"
					/>
				</circle>
				<circle cx="1240" cy="65" r="2.5" fill="var(--sw-star-pink)" opacity="0.88">
					<animate
						attributeName="opacity"
						values="0.88;0.1;0.88"
						dur="3.7s"
						repeatCount="indefinite"
						begin="1.9s"
					/>
					<animate
						attributeName="r"
						values="2.5;1.0;2.5"
						dur="3.7s"
						repeatCount="indefinite"
						begin="1.9s"
					/>
				</circle>
				<circle cx="1760" cy="49" r="2.8" fill="var(--sw-star-pink)" opacity="0.92">
					<animate
						attributeName="opacity"
						values="0.92;0.15;0.92"
						dur="4.5s"
						repeatCount="indefinite"
						begin="0.4s"
					/>
					<animate
						attributeName="r"
						values="2.8;1.1;2.8"
						dur="4.5s"
						repeatCount="indefinite"
						begin="0.4s"
					/>
				</circle>

				<!-- Twinkling stars — yellow -->
				<circle cx="500" cy="78" r="2.9" fill="var(--sw-star-yellow)" opacity="0.92">
					<animate
						attributeName="opacity"
						values="0.92;0.12;0.92"
						dur="6.1s"
						repeatCount="indefinite"
						begin="2.2s"
					/>
					<animate
						attributeName="r"
						values="2.9;1.2;2.9"
						dur="6.1s"
						repeatCount="indefinite"
						begin="2.2s"
					/>
				</circle>
				<circle cx="1090" cy="36" r="2.6" fill="var(--sw-star-yellow)" opacity="0.88">
					<animate
						attributeName="opacity"
						values="0.88;0.1;0.88"
						dur="3.4s"
						repeatCount="indefinite"
						begin="4.1s"
					/>
					<animate
						attributeName="r"
						values="2.6;1.0;2.6"
						dur="3.4s"
						repeatCount="indefinite"
						begin="4.1s"
					/>
				</circle>
				<circle cx="1420" cy="72" r="2.7" fill="var(--sw-star-yellow)" opacity="0.9">
					<animate
						attributeName="opacity"
						values="0.9;0.12;0.9"
						dur="5.6s"
						repeatCount="indefinite"
						begin="1.6s"
					/>
					<animate
						attributeName="r"
						values="2.7;1.1;2.7"
						dur="5.6s"
						repeatCount="indefinite"
						begin="1.6s"
					/>
				</circle>

				<!-- Twinkling stars — purple -->
				<circle cx="850" cy="83" r="2.6" fill="var(--sw-star-purple)" opacity="0.9">
					<animate
						attributeName="opacity"
						values="0.9;0.12;0.9"
						dur="5.0s"
						repeatCount="indefinite"
						begin="3.4s"
					/>
					<animate
						attributeName="r"
						values="2.6;1.0;2.6"
						dur="5.0s"
						repeatCount="indefinite"
						begin="3.4s"
					/>
				</circle>
				<circle cx="1650" cy="43" r="2.8" fill="var(--sw-star-purple)" opacity="0.88">
					<animate
						attributeName="opacity"
						values="0.88;0.1;0.88"
						dur="3.8s"
						repeatCount="indefinite"
						begin="0.8s"
					/>
					<animate
						attributeName="r"
						values="2.8;1.1;2.8"
						dur="3.8s"
						repeatCount="indefinite"
						begin="0.8s"
					/>
				</circle>
			</g>

			<!-- ═══ CLOUDS — visible only in light mode ═══ -->
			<g style="opacity: var(--sw-clouds-opacity);" fill="var(--sw-cloud-fill)">
				<!-- Drifting cloud 1 -->
				<g>
					<ellipse cx="0" cy="50" rx="55" ry="11" />
					<ellipse cx="-25" cy="46" rx="32" ry="9" />
					<ellipse cx="22" cy="46" rx="28" ry="8" />
					<animateTransform
						attributeName="transform"
						type="translate"
						values="200 0; 1850 0; 200 0"
						dur="180s"
						repeatCount="indefinite"
					/>
				</g>
				<!-- Drifting cloud 2 -->
				<g>
					<ellipse cx="0" cy="80" rx="42" ry="9" />
					<ellipse cx="-18" cy="76" rx="24" ry="7" />
					<ellipse cx="20" cy="77" rx="22" ry="7" />
					<animateTransform
						attributeName="transform"
						type="translate"
						values="-100 0; 2000 0; -100 0"
						dur="240s"
						repeatCount="indefinite"
					/>
				</g>
				<!-- Drifting cloud 3 -->
				<g>
					<ellipse cx="0" cy="35" rx="38" ry="8" />
					<ellipse cx="-15" cy="32" rx="22" ry="6" />
					<ellipse cx="18" cy="33" rx="20" ry="6" />
					<animateTransform
						attributeName="transform"
						type="translate"
						values="900 0; 2100 0; 900 0"
						dur="220s"
						repeatCount="indefinite"
					/>
				</g>
				<!-- Drifting cloud 4 -->
				<g>
					<ellipse cx="0" cy="110" rx="48" ry="10" />
					<ellipse cx="-22" cy="106" rx="28" ry="8" />
					<ellipse cx="24" cy="107" rx="25" ry="7" />
					<animateTransform
						attributeName="transform"
						type="translate"
						values="500 0; 2200 0; 500 0"
						dur="300s"
						repeatCount="indefinite"
					/>
				</g>
			</g>

			<!-- ═══ HORIZON GLOW ═══ -->
			<ellipse cx="960" cy="194" rx="700" ry="190" fill="url(#horizonGlow)" />

			<!-- ═══ SUN ═══ -->
			<g clip-path="url(#skyClip)">
				<!-- Sun base -->
				<circle cx="960" cy="194" r="86" fill="url(#sunFill)" />

				<!-- Retrowave scan lines (opacity faded in light mode) -->
				<g clip-path="url(#sunClip)" style="opacity: var(--sw-sun-lines-opacity);">
					<rect x="874" y="112" width="172" height="2" fill="var(--sw-sun-lines)" opacity="0.50" />
					<rect x="874" y="121" width="172" height="2" fill="var(--sw-sun-lines)" opacity="0.50" />
					<rect x="874" y="130" width="172" height="2" fill="var(--sw-sun-lines)" opacity="0.52" />
					<rect x="874" y="139" width="172" height="2" fill="var(--sw-sun-lines)" opacity="0.52" />
					<rect x="874" y="147" width="172" height="2" fill="var(--sw-sun-lines)" opacity="0.54" />
					<rect x="874" y="154" width="172" height="2" fill="var(--sw-sun-lines)" opacity="0.54" />
					<rect x="874" y="161" width="172" height="2" fill="var(--sw-sun-lines)" opacity="0.56" />
					<rect x="874" y="168" width="172" height="2" fill="var(--sw-sun-lines)" opacity="0.56" />
					<rect x="874" y="174" width="172" height="2" fill="var(--sw-sun-lines)" opacity="0.58" />
					<rect x="874" y="180" width="172" height="2" fill="var(--sw-sun-lines)" opacity="0.58" />
					<rect x="874" y="185" width="172" height="2" fill="var(--sw-sun-lines)" opacity="0.60" />
					<rect x="874" y="190" width="172" height="2" fill="var(--sw-sun-lines)" opacity="0.62" />
					<rect x="874" y="194" width="172" height="2" fill="var(--sw-sun-lines)" opacity="0.64" />
					<rect
						x="874"
						y="198"
						width="172"
						height="1.5"
						fill="var(--sw-sun-lines)"
						opacity="0.64"
					/>
					<rect
						x="874"
						y="202"
						width="172"
						height="1.5"
						fill="var(--sw-sun-lines)"
						opacity="0.65"
					/>
				</g>

				<!-- Sun rim glow -->
				<circle
					cx="960"
					cy="194"
					r="86"
					fill="none"
					stroke="var(--sw-sun-rim-inner)"
					stroke-width="2.5"
					opacity="var(--sw-sun-rim-inner-opacity)"
				/>
				<circle
					cx="960"
					cy="194"
					r="94"
					fill="none"
					stroke="var(--sw-sun-rim-outer)"
					stroke-width="2"
					opacity="var(--sw-sun-rim-outer-opacity)"
				/>
			</g>

			<!-- ═══ OCEAN ═══ -->
			<rect x="0" y="194" width="1920" height="126" fill="url(#oceanGrad)" />

			<!-- Sun reflection -->
			<ellipse
				cx="960"
				cy="230"
				rx="88"
				ry="136"
				fill="url(#reflectGrad)"
				style="opacity: var(--sw-reflect-overall-opacity);"
			/>

			<!-- Wave 1 — far -->
			<path fill="var(--sw-wave-far)" fill-opacity="var(--sw-wave-far-opacity)">
				<animate
					attributeName="d"
					values="
          M0,210 Q240,202 480,210 Q720,218 960,210 Q1200,202 1440,210 Q1680,218 1920,210 L1920,222 L0,222 Z;
          M0,215 Q240,207 480,215 Q720,223 960,215 Q1200,207 1440,215 Q1680,223 1920,215 L1920,222 L0,222 Z;
          M0,210 Q240,202 480,210 Q720,218 960,210 Q1200,202 1440,210 Q1680,218 1920,210 L1920,222 L0,222 Z"
					dur="6s"
					repeatCount="indefinite"
					calcMode="spline"
					keySplines="0.45 0 0.55 1; 0.45 0 0.55 1"
				/>
			</path>

			<!-- Wave 2 — mid -->
			<path fill="var(--sw-wave-mid)" fill-opacity="var(--sw-wave-mid-opacity)">
				<animate
					attributeName="d"
					values="
          M0,226 Q320,216 640,226 Q960,236 1280,226 Q1600,216 1920,226 L1920,242 L0,242 Z;
          M0,232 Q320,222 640,232 Q960,242 1280,232 Q1600,222 1920,232 L1920,242 L0,242 Z;
          M0,226 Q320,216 640,226 Q960,236 1280,226 Q1600,216 1920,226 L1920,242 L0,242 Z"
					dur="8.5s"
					repeatCount="indefinite"
					calcMode="spline"
					keySplines="0.45 0 0.55 1; 0.45 0 0.55 1"
					begin="0.5s"
				/>
			</path>

			<!-- Wave 3 — front -->
			<path fill="var(--sw-wave-near)" fill-opacity="var(--sw-wave-near-opacity)">
				<animate
					attributeName="d"
					values="
          M0,246 Q400,234 800,246 Q1200,258 1600,246 Q1760,240 1920,246 L1920,264 L0,264 Z;
          M0,252 Q400,240 800,252 Q1200,264 1600,252 Q1760,246 1920,252 L1920,264 L0,264 Z;
          M0,246 Q400,234 800,246 Q1200,258 1600,246 Q1760,240 1920,246 L1920,264 L0,264 Z"
					dur="10s"
					repeatCount="indefinite"
					calcMode="spline"
					keySplines="0.45 0 0.55 1; 0.45 0 0.55 1"
					begin="1.2s"
				/>
			</path>

			<!-- Foam -->
			<path
				fill="none"
				stroke="var(--sw-foam)"
				stroke-width="1.2"
				stroke-opacity="var(--sw-foam-opacity)"
			>
				<animate
					attributeName="d"
					values="
          M0,246 Q400,234 800,246 Q1200,258 1600,246 Q1760,240 1920,246;
          M0,252 Q400,240 800,252 Q1200,264 1600,252 Q1760,246 1920,252;
          M0,246 Q400,234 800,246 Q1200,258 1600,246 Q1760,240 1920,246"
					dur="10s"
					repeatCount="indefinite"
					calcMode="spline"
					keySplines="0.45 0 0.55 1; 0.45 0 0.55 1"
					begin="1.2s"
				/>
			</path>

			<!-- ═══ SAND ═══ -->
			<path
				d="M0,274 Q480,262 960,266 Q1440,270 1920,262 L1920,320 L0,320 Z"
				fill="url(#sandGrad)"
			/>
			<path
				d="M0,274 Q480,262 960,266 Q1440,270 1920,262"
				fill="none"
				stroke="var(--sw-sand-edge)"
				stroke-width="1"
				stroke-opacity="var(--sw-sand-edge-opacity)"
			/>

			<!-- Horizon line -->
			<line
				x1="0"
				y1="194"
				x2="1920"
				y2="194"
				stroke="var(--sw-horizon-line)"
				stroke-width="1.2"
				opacity="var(--sw-horizon-line-opacity)"
			/>

			<!-- ═══ PALM TREE — left silhouette ═══ -->
			<g>
				<!-- Trunk -->
				<path
					d="M -30,322 C 8,288 38,250 68,210 C 95,172 130,138 165,106 C 184,88 200,74 210,66 C 216,74 205,92 188,112 C 153,144 118,178 90,216 C 58,256 26,292 8,322 Z"
					fill="var(--sw-palm)"
				/>

				<!-- Fronds -->
				<path d="M210,66 Q158,28 78,2  Q112,30 150,50 Q182,54 210,66 Z" fill="var(--sw-palm)" />
				<path d="M210,66 Q148,48 72,40 Q110,48 158,56 Q186,58 210,66 Z" fill="var(--sw-palm)" />
				<path d="M210,66 Q135,58 52,80  Q98,62 158,62 Q186,62 210,66 Z" fill="var(--sw-palm)" />
				<path d="M210,66 Q122,78 48,108 Q96,80 158,70 Q188,66 210,66 Z" fill="var(--sw-palm)" />
				<path d="M210,66 Q118,100 55,152 Q108,108 168,84 Q192,74 210,66 Z" fill="var(--sw-palm)" />
				<path d="M210,66 Q130,122 88,186 Q138,134 182,98  Q200,80 210,66 Z" fill="var(--sw-palm)" />
				<path
					d="M210,66 Q200,22 202,-24 Q210,18 218,-24 Q220,22 222,66 Q216,60 210,66 Z"
					fill="var(--sw-palm)"
				/>
				<path d="M210,66 Q258,30 326,8  Q288,36 248,52 Q226,58 210,66 Z" fill="var(--sw-palm)" />
				<path d="M210,66 Q268,48 342,46 Q296,54 248,58 Q226,60 210,66 Z" fill="var(--sw-palm)" />
				<path d="M210,66 Q285,58 362,74 Q308,62 256,64 Q230,64 210,66 Z" fill="var(--sw-palm)" />
				<path d="M210,66 Q298,96 355,150 Q296,108 240,84 Q222,74 210,66 Z" fill="var(--sw-palm)" />
				<path
					d="M210,66 Q288,128 318,198 Q262,146 224,104 Q214,84 210,66 Z"
					fill="var(--sw-palm)"
				/>

				<animateTransform
					attributeName="transform"
					type="rotate"
					values="0 30 315; 2.0 30 315; -1.4 30 315; 0 30 315"
					dur="7s"
					repeatCount="indefinite"
					calcMode="spline"
					keySplines="0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1"
				/>
			</g>
		</g>
	</svg>
</div>

<style>
	/* ═══════════════════════════════════════════════════
     DARK / NIGHT THEME — synthwave twilight (default)
  ═══════════════════════════════════════════════════ */
	:global(:root),
	:global([data-theme="dark"]) {
		/* Sky gradient — anchored to the global accent family, but kept vivid */
		--sw-sky-0: hsl(0deg 0% 4%);
		--sw-sky-1: hsl(242deg 34% 7%);
		--sw-sky-2: color-mix(in srgb, var(--color-accent-3-surface) 80%, hsl(0deg 0% 0%) 20%);
		--sw-sky-3: hsl(278deg 70% 18%);
		--sw-sky-4: hsl(304deg 73% 29%);
		--sw-sky-5: var(--color-primary);
		--sw-sky-6: hsl(8deg 84% 57%);
		--sw-sky-7: hsl(30deg 100% 54%);

		/* Horizon glow */
		--sw-glow-inner: color-mix(in srgb, var(--color-accent-1) 88%, hsl(0deg 0% 100%) 12%);
		--sw-glow-mid: var(--color-primary);
		--sw-glow-outer: var(--color-accent-3);
		--sw-glow-fade: hsl(0deg 0% 0%);
		--sw-glow-opacity-inner: 0.42;
		--sw-glow-opacity-mid: 0.24;
		--sw-glow-opacity-outer: 0.1;

		/* Sun */
		--sw-sun-0: hsl(52deg 100% 84%);
		--sw-sun-1: hsl(35deg 100% 58%);
		--sw-sun-2: var(--color-primary);
		--sw-sun-3: color-mix(in srgb, var(--color-accent-3) 84%, var(--color-primary) 16%);
		--sw-sun-lines: hsl(264deg 80% 10%);
		--sw-sun-lines-opacity: 1;
		--sw-sun-rim-inner: color-mix(in srgb, var(--color-accent-1) 78%, hsl(0deg 0% 100%) 22%);
		--sw-sun-rim-inner-opacity: 0.72;
		--sw-sun-rim-outer: var(--color-primary);
		--sw-sun-rim-outer-opacity: 0.38;

		/* Stars */
		--sw-stars-opacity: 1;
		--sw-star-base: hsl(0deg 0% 100%);
		--sw-star-cyan: color-mix(in srgb, var(--color-accent-2) 74%, hsl(0deg 0% 100%) 26%);
		--sw-star-pink: color-mix(in srgb, var(--color-primary) 76%, hsl(0deg 0% 100%) 24%);
		--sw-star-yellow: color-mix(in srgb, var(--color-accent-1) 78%, hsl(0deg 0% 100%) 22%);
		--sw-star-purple: color-mix(in srgb, var(--color-accent-3) 76%, hsl(0deg 0% 100%) 24%);

		/* Clouds (hidden in dark mode) */
		--sw-clouds-opacity: 0;
		--sw-cloud-fill: hsl(0deg 0% 100%);

		/* Ocean */
		--sw-ocean-0: color-mix(in srgb, var(--color-primary) 76%, hsl(12deg 100% 54%) 24%);
		--sw-ocean-1: color-mix(in srgb, var(--color-accent-3-surface) 72%, var(--color-accent-3) 28%);
		--sw-ocean-2: color-mix(in srgb, var(--color-background) 90%, hsl(244deg 40% 3%) 10%);

		/* Sun reflection */
		--sw-reflect-0: color-mix(in srgb, var(--color-accent-1) 86%, hsl(0deg 0% 100%) 14%);
		--sw-reflect-1: color-mix(in srgb, var(--color-primary) 74%, hsl(12deg 100% 54%) 26%);
		--sw-reflect-2: hsl(0deg 0% 0%);
		--sw-reflect-opacity-0: 0.48;
		--sw-reflect-opacity-1: 0.22;
		--sw-reflect-overall-opacity: 0.75;

		/* Waves */
		--sw-wave-far: color-mix(in srgb, var(--color-primary) 88%, hsl(0deg 0% 100%) 12%);
		--sw-wave-far-opacity: 0.18;
		--sw-wave-mid: color-mix(in srgb, var(--color-accent-3) 88%, hsl(0deg 0% 100%) 12%);
		--sw-wave-mid-opacity: 0.22;
		--sw-wave-near: var(--color-accent-2);
		--sw-wave-near-opacity: 0.18;
		--sw-foam: color-mix(in srgb, var(--color-accent-2) 52%, hsl(0deg 0% 100%) 48%);
		--sw-foam-opacity: 0.3;

		/* Sand */
		--sw-sand-0: color-mix(in srgb, var(--color-accent-3-surface) 82%, var(--color-background) 18%);
		--sw-sand-1: color-mix(in srgb, var(--color-background) 94%, hsl(0deg 0% 0%) 6%);
		--sw-sand-edge: var(--color-accent-3);
		--sw-sand-edge-opacity: 0.26;

		/* Horizon line */
		--sw-horizon-line: color-mix(in srgb, var(--color-accent-1) 88%, hsl(0deg 0% 100%) 12%);
		--sw-horizon-line-opacity: 0.5;

		/* Palm */
		--sw-palm: hsl(262deg 100% 3%);
	}

	/* ═══════════════════════════════════════════════════
     LIGHT / DAY THEME — bright tropical beach
  ═══════════════════════════════════════════════════ */
	:global([data-theme="light"]) {
		/* Sky — brighter and more saturated, tied to the cyan/teal site accents */
		--sw-sky-0: color-mix(in srgb, var(--color-accent-2) 82%, hsl(0deg 0% 100%) 18%);
		--sw-sky-1: color-mix(in srgb, var(--color-accent-2) 72%, hsl(0deg 0% 100%) 28%);
		--sw-sky-2: color-mix(in srgb, var(--color-secondary) 58%, hsl(0deg 0% 100%) 42%);
		--sw-sky-3: color-mix(in srgb, var(--color-secondary) 44%, hsl(0deg 0% 100%) 56%);
		--sw-sky-4: color-mix(in srgb, var(--color-accent-2-surface) 80%, hsl(0deg 0% 100%) 20%);
		--sw-sky-5: color-mix(
			in srgb,
			var(--color-accent-2-surface) 54%,
			var(--color-secondary-surface) 46%
		);
		--sw-sky-6: color-mix(
			in srgb,
			var(--color-secondary-surface) 52%,
			var(--color-accent-1-surface) 48%
		);
		--sw-sky-7: color-mix(in srgb, var(--color-accent-1-surface) 84%, var(--color-accent-1) 16%);

		/* Horizon glow — soft warm sun haze */
		--sw-glow-inner: color-mix(in srgb, var(--color-accent-1) 52%, hsl(0deg 0% 100%) 48%);
		--sw-glow-mid: color-mix(in srgb, var(--color-accent-1) 76%, hsl(0deg 0% 100%) 24%);
		--sw-glow-outer: color-mix(in srgb, var(--color-accent-2) 28%, hsl(0deg 0% 100%) 72%);
		--sw-glow-fade: hsl(0deg 0% 100%);
		--sw-glow-opacity-inner: 0.58;
		--sw-glow-opacity-mid: 0.3;
		--sw-glow-opacity-outer: 0.12;

		/* Sun — warmer and less washed out */
		--sw-sun-0: hsl(52deg 100% 93%);
		--sw-sun-1: color-mix(in srgb, var(--color-accent-1) 62%, hsl(0deg 0% 100%) 38%);
		--sw-sun-2: color-mix(in srgb, var(--color-accent-1) 92%, hsl(0deg 0% 100%) 8%);
		--sw-sun-3: color-mix(in srgb, var(--color-accent-1) 68%, hsl(34deg 100% 54%) 32%);
		--sw-sun-lines: transparent;
		--sw-sun-lines-opacity: 0;
		--sw-sun-rim-inner: color-mix(in srgb, var(--color-accent-1) 56%, hsl(0deg 0% 100%) 44%);
		--sw-sun-rim-inner-opacity: 0.92;
		--sw-sun-rim-outer: color-mix(in srgb, var(--color-accent-1) 84%, hsl(34deg 100% 58%) 16%);
		--sw-sun-rim-outer-opacity: 0.64;

		/* Stars — invisible during day */
		--sw-stars-opacity: 0;

		/* Clouds — visible drifting clouds */
		--sw-clouds-opacity: 0.56;
		--sw-cloud-fill: hsl(0deg 0% 100%);

		/* Ocean — brighter tropical cyan with more depth */
		--sw-ocean-0: color-mix(in srgb, var(--color-secondary) 80%, hsl(0deg 0% 100%) 20%);
		--sw-ocean-1: color-mix(in srgb, var(--color-accent-2) 76%, var(--color-secondary) 24%);
		--sw-ocean-2: color-mix(in srgb, var(--color-accent-2) 82%, hsl(206deg 78% 22%) 18%);

		/* Sun reflection — bright glint on water */
		--sw-reflect-0: hsl(0deg 0% 100%);
		--sw-reflect-1: color-mix(in srgb, var(--color-accent-1) 52%, hsl(0deg 0% 100%) 48%);
		--sw-reflect-2: hsl(0deg 0% 100%);
		--sw-reflect-opacity-0: 0.7;
		--sw-reflect-opacity-1: 0.32;
		--sw-reflect-overall-opacity: 0.78;

		/* Waves — turquoise/cyan whitecaps */
		--sw-wave-far: color-mix(in srgb, var(--color-secondary) 60%, hsl(0deg 0% 100%) 40%);
		--sw-wave-far-opacity: 0.42;
		--sw-wave-mid: color-mix(in srgb, var(--color-accent-2) 62%, hsl(0deg 0% 100%) 38%);
		--sw-wave-mid-opacity: 0.38;
		--sw-wave-near: color-mix(in srgb, var(--color-accent-2) 78%, var(--color-secondary) 22%);
		--sw-wave-near-opacity: 0.34;
		--sw-foam: hsl(0deg 0% 100%);
		--sw-foam-opacity: 0.78;

		/* Sand — warm tropical beach */
		--sw-sand-0: color-mix(in srgb, var(--color-accent-1) 30%, hsl(0deg 0% 100%) 70%);
		--sw-sand-1: color-mix(in srgb, var(--color-accent-1) 62%, hsl(32deg 68% 58%) 38%);
		--sw-sand-edge: color-mix(in srgb, var(--color-accent-1) 72%, hsl(32deg 68% 52%) 28%);
		--sw-sand-edge-opacity: 0.5;

		/* Horizon line — barely visible in daylight */
		--sw-horizon-line: color-mix(in srgb, var(--color-accent-2) 56%, var(--color-secondary) 44%);
		--sw-horizon-line-opacity: 0.24;

		/* Palm — still a dark silhouette but warmer to fit daylight */
		--sw-palm: hsl(155deg 30% 12%);
	}

	/* Smooth transitions when toggling themes */
	.footer-wrap :global(*) {
		transition:
			fill 0.6s ease,
			stroke 0.6s ease,
			stop-color 0.6s ease,
			opacity 0.6s ease;
	}

	.footer-wrap {
		width: 100%;
		line-height: 0;
	}

	svg {
		display: block;
		width: 100%;
		height: 100%;
	}
</style>
