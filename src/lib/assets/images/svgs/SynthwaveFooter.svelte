<div class="footer-wrap">
	<svg
		viewBox="0 0 1920 320"
		xmlns="http://www.w3.org/2000/svg"
		preserveAspectRatio="xMidYMid slice"
	>
		<defs>
			<!-- Sky: pure black → deep space → twilight purple → hot sunset -->
			<linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
				<stop offset="0%" stop-color="hsl(0deg 0% 7%)" />
				<stop offset="18%" stop-color="hsl(0deg 0% 9%)" />
				<stop offset="36%" stop-color="hsl(267deg 55% 11%" />
				<stop offset="54%" stop-color="#3a0850" />
				<stop offset="68%" stop-color="#72106a" />
				<stop offset="80%" stop-color="#b82060" />
				<stop offset="91%" stop-color="#e04030" />
				<stop offset="100%" stop-color="#f06010" />
			</linearGradient>

			<!-- Soft radial glow from horizon — dispersed, no hard rect edge -->
			<radialGradient id="horizonGlow" cx="50%" cy="100%" r="60%">
				<stop offset="0%" stop-color="#ffcc44" stop-opacity="0.42" />
				<stop offset="22%" stop-color="hsl(324,84%,65%)" stop-opacity="0.20" />
				<stop offset="55%" stop-color="hsl(267,72%,63%)" stop-opacity="0.07" />
				<stop offset="100%" stop-color="#000000" stop-opacity="0" />
			</radialGradient>

			<!-- Sun fill: warm yellow-white top → orange → pink → purple bottom -->
			<linearGradient id="sunFill" x1="0" y1="0" x2="0" y2="1">
				<stop offset="0%" stop-color="#fff0a0" />
				<stop offset="30%" stop-color="#ffb030" />
				<stop offset="65%" stop-color="hsl(324,84%,60%)" />
				<stop offset="100%" stop-color="hsl(267,72%,55%)" />
			</linearGradient>

			<!-- Clip to sun circle only (for scan lines) -->
			<clipPath id="sunClip">
				<circle cx="960" cy="194" r="86" />
			</clipPath>

			<!-- Clip above horizon line -->
			<clipPath id="skyClip">
				<rect x="0" y="0" width="1920" height="194" />
			</clipPath>

			<!-- Ocean -->
			<linearGradient id="oceanGrad" x1="0" y1="0" x2="0" y2="1">
				<stop offset="0%" stop-color="#aa1850" />
				<stop offset="35%" stop-color="#2e0850" />
				<stop offset="100%" stop-color="#080015" />
			</linearGradient>

			<!-- Sun reflection on water: tapered soft column -->
			<radialGradient id="reflectGrad" cx="50%" cy="0%" r="100%" fx="50%" fy="0%">
				<stop offset="0%" stop-color="#ffcc44" stop-opacity="0.48" />
				<stop offset="45%" stop-color="#ff5533" stop-opacity="0.18" />
				<stop offset="100%" stop-color="#000000" stop-opacity="0" />
			</radialGradient>

			<!-- Sand -->
			<linearGradient id="sandGrad" x1="0" y1="0" x2="0" y2="1">
				<stop offset="0%" stop-color="#1e0638" />
				<stop offset="100%" stop-color="#0c0018" />
			</linearGradient>

			<!-- Star soft glow -->
			<filter id="starGlow" x="-300%" y="-300%" width="700%" height="700%">
				<feGaussianBlur stdDeviation="2.8" result="blur" />
				<feMerge>
					<feMergeNode in="blur" />
					<feMergeNode in="SourceGraphic" />
				</feMerge>
			</filter>
		</defs>

		<!-- ═══ SKY BASE ═══ -->
		<rect x="0" y="0" width="1920" height="320" fill="url(#skyGrad)" />

		<!-- ═══ STARS — large, vivid, clearly visible ═══ -->
		<g filter="url(#starGlow)">
			<!-- Static white stars -->
			<g fill="white">
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
			<circle cx="310" cy="31" r="2.8" fill="hsl(195,100%,72%)" opacity="0.95">
				<animate
					attributeName="opacity"
					values="0.95;0.12;0.95"
					dur="3.2s"
					repeatCount="indefinite"
				/>
				<animate attributeName="r" values="2.8;1.1;2.8" dur="3.2s" repeatCount="indefinite" />
			</circle>
			<circle cx="940" cy="51" r="2.6" fill="hsl(195,100%,72%)" opacity="0.9">
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
			<circle cx="1580" cy="26" r="3.0" fill="hsl(195,100%,72%)" opacity="0.9">
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
			<circle cx="152" cy="62" r="2.4" fill="hsl(195,100%,72%)" opacity="0.88">
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
			<circle cx="680" cy="19" r="2.7" fill="hsl(324,84%,78%)" opacity="0.92">
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
			<circle cx="1240" cy="65" r="2.5" fill="hsl(324,84%,78%)" opacity="0.88">
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
			<circle cx="1760" cy="49" r="2.8" fill="hsl(324,84%,78%)" opacity="0.92">
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
			<circle cx="500" cy="78" r="2.9" fill="hsl(52,99%,74%)" opacity="0.92">
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
			<circle cx="1090" cy="36" r="2.6" fill="hsl(52,99%,74%)" opacity="0.88">
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
			<circle cx="1420" cy="72" r="2.7" fill="hsl(52,99%,74%)" opacity="0.9">
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
			<circle cx="850" cy="83" r="2.6" fill="hsl(267,72%,76%)" opacity="0.9">
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
			<circle cx="1650" cy="43" r="2.8" fill="hsl(267,72%,76%)" opacity="0.88">
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

		<!-- ═══ HORIZON GLOW — soft ellipse, no hard box ═══ -->
		<ellipse cx="960" cy="194" rx="700" ry="190" fill="url(#horizonGlow)" />

		<!-- ═══ SUN (clipped above horizon) ═══ -->
		<g clip-path="url(#skyClip)">
			<!-- Sun base -->
			<circle cx="960" cy="194" r="86" fill="url(#sunFill)" />

			<!-- Retrowave horizontal scan lines across ENTIRE sun face
         Lines get progressively closer together from top to bottom,
         mimicking the perspective/grid look in reference image 1 -->
			<g clip-path="url(#sunClip)">
				<!-- Top area: widest gaps -->
				<rect x="874" y="112" width="172" height="2" fill="#0d0020" opacity="0.50" />
				<rect x="874" y="121" width="172" height="2" fill="#0d0020" opacity="0.50" />
				<rect x="874" y="130" width="172" height="2" fill="#0d0020" opacity="0.52" />
				<rect x="874" y="139" width="172" height="2" fill="#0d0020" opacity="0.52" />
				<!-- Mid-upper: slightly closer -->
				<rect x="874" y="147" width="172" height="2" fill="#0d0020" opacity="0.54" />
				<rect x="874" y="154" width="172" height="2" fill="#0d0020" opacity="0.54" />
				<rect x="874" y="161" width="172" height="2" fill="#0d0020" opacity="0.56" />
				<rect x="874" y="168" width="172" height="2" fill="#0d0020" opacity="0.56" />
				<!-- Mid: tighter -->
				<rect x="874" y="174" width="172" height="2" fill="#0d0020" opacity="0.58" />
				<rect x="874" y="180" width="172" height="2" fill="#0d0020" opacity="0.58" />
				<rect x="874" y="185" width="172" height="2" fill="#0d0020" opacity="0.60" />
				<!-- Lower: tightest spacing -->
				<rect x="874" y="190" width="172" height="2" fill="#0d0020" opacity="0.62" />
				<rect x="874" y="194" width="172" height="2" fill="#0d0020" opacity="0.64" />
				<rect x="874" y="198" width="172" height="1.5" fill="#0d0020" opacity="0.64" />
				<rect x="874" y="202" width="172" height="1.5" fill="#0d0020" opacity="0.65" />
			</g>

			<!-- Sun rim glow layers -->
			<circle
				cx="960"
				cy="194"
				r="86"
				fill="none"
				stroke="#ffe566"
				stroke-width="2.5"
				opacity="0.72"
			/>
			<circle
				cx="960"
				cy="194"
				r="94"
				fill="none"
				stroke="hsl(324,84%,65%)"
				stroke-width="2"
				opacity="0.32"
			/>
		</g>

		<!-- ═══ OCEAN ═══ -->
		<rect x="0" y="194" width="1920" height="126" fill="url(#oceanGrad)" />

		<!-- Sun reflection: narrow tapered ellipse, no hard edges -->
		<ellipse cx="960" cy="230" rx="88" ry="136" fill="url(#reflectGrad)" opacity="0.75" />

		<!-- Wave 1 (far, subtle pink) -->
		<path fill="hsl(324,84%,55%)" fill-opacity="0.14">
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

		<!-- Wave 2 (mid, purple) -->
		<path fill="hsl(267,72%,50%)" fill-opacity="0.18">
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

		<!-- Wave 3 (front, cyan) -->
		<path fill="hsl(195,100%,49%)" fill-opacity="0.15">
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

		<!-- Front wave foam highlight -->
		<path fill="none" stroke="hsl(195,100%,80%)" stroke-width="1.2" stroke-opacity="0.28">
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

		<!-- ═══ BEACH SAND ═══ -->
		<path d="M0,274 Q480,262 960,266 Q1440,270 1920,262 L1920,320 L0,320 Z" fill="url(#sandGrad)" />
		<path
			d="M0,274 Q480,262 960,266 Q1440,270 1920,262"
			fill="none"
			stroke="hsl(267,72%,63%)"
			stroke-width="1"
			stroke-opacity="0.22"
		/>

		<!-- Horizon neon line -->
		<line x1="0" y1="194" x2="1920" y2="194" stroke="#ffdd55" stroke-width="1.2" opacity="0.45" />

		<!-- ═══════════════════════════════════════════════════
       LEFT PALM TREE — single silhouette, left edge only.
       Trunk base rooted off-screen left, curves up and right.
       Thicker trunk, more substantial fronds.
       Crown center approximately (210, 68)
  ═══════════════════════════════════════════════════ -->
		<g>
			<!-- Trunk: wider closed shape, gentle S-curve -->
			<path
				d="
      M -30,322
      C   8,288  38,250  68,210
      C  95,172  130,138  165,106
      C  184,88   200,74   210,66
      C  216,74   205,92   188,112
      C  153,144  118,178   90,216
      C  58,256   26,292    8,322
      Z
    "
				fill="#04000a"
			/>

			<!-- Fronds — wider, longer, more overlapping for a fuller crown -->
			<!-- Each frond is a fatter lens shape: wider spine + thicker body -->

			<!-- Frond 1: upper-left long sweep -->
			<path d="M210,66 Q158,28 78,2  Q112,30 150,50 Q182,54 210,66 Z" fill="#04000a" />
			<!-- Frond 1b: sub-frond upper-left, slightly lower angle -->
			<path d="M210,66 Q148,48 72,40 Q110,48 158,56 Q186,58 210,66 Z" fill="#04000a" />

			<!-- Frond 2: left-horizontal sweep -->
			<path d="M210,66 Q135,58 52,80  Q98,62 158,62 Q186,62 210,66 Z" fill="#04000a" />
			<!-- Frond 2b: left-horizontal lower -->
			<path d="M210,66 Q122,78 48,108 Q96,80 158,70 Q188,66 210,66 Z" fill="#04000a" />

			<!-- Frond 3: left-down droop -->
			<path d="M210,66 Q118,100 55,152 Q108,108 168,84 Q192,74 210,66 Z" fill="#04000a" />
			<!-- Frond 3b: steeper left-down -->
			<path d="M210,66 Q130,122 88,186 Q138,134 182,98  Q200,80 210,66 Z" fill="#04000a" />

			<!-- Frond 4: straight up, wide -->
			<path
				d="M210,66 Q200,22 202,-24 Q210,18 218,-24 Q220,22 222,66 Q216,60 210,66 Z"
				fill="#04000a"
			/>

			<!-- Frond 5: upper-right sweep -->
			<path d="M210,66 Q258,30 326,8  Q288,36 248,52 Q226,58 210,66 Z" fill="#04000a" />
			<!-- Frond 5b: upper-right, slightly lower -->
			<path d="M210,66 Q268,48 342,46 Q296,54 248,58 Q226,60 210,66 Z" fill="#04000a" />

			<!-- Frond 6: right-horizontal -->
			<path d="M210,66 Q285,58 362,74 Q308,62 256,64 Q230,64 210,66 Z" fill="#04000a" />

			<!-- Frond 7: right-down droop -->
			<path d="M210,66 Q298,96 355,150 Q296,108 240,84 Q222,74 210,66 Z" fill="#04000a" />
			<!-- Frond 7b: steeper right-down -->
			<path d="M210,66 Q288,128 318,198 Q262,146 224,104 Q214,84 210,66 Z" fill="#04000a" />

			<!-- Sway — pivot near trunk base, gentle -->
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
	</svg>
</div>

<style>
	svg {
		display: block;
		width: 100%;
		height: 100%;
	}
</style>
