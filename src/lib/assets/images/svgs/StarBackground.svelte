<div class="clst-hero">
	<!-- Round stars: 3 box-shadow layers (~140 stars, 3 DOM nodes) -->
	<div class="clst-stars-slow"></div>
	<div class="clst-stars-med"></div>
	<div class="clst-stars-fast"></div>

	<!-- Pointed stars: 24 minimal divs -->
	<div
		class="sp sp-slow"
		style="top:560.7px;left:217.3px;

--sz:8.2px;--c:var(--clst-purple)"
	></div>
	<div
		class="sp sp-slow"
		style="top:462.9px;left:1657.6px;

--sz:14.0px;--c:var(--clst-white)"
	></div>
	<div
		class="sp sp-slow"
		style="top:125.8px;left:1696.5px;

--sz:13.2px;--c:var(--clst-cyan-dim)"
	></div>
	<div
		class="sp sp-slow"
		style="top:604.4px;left:1739.9px;

--sz:12.3px;--c:var(--clst-purple)"
	></div>
	<div
		class="sp sp-slow"
		style="top:444.5px;left:128.3px;

--sz:13.5px;--c:var(--clst-cyan-dim)"
	></div>
	<div
		class="sp sp-slow"
		style="top:114.7px;left:71.9px;

--sz:6.2px;--c:var(--clst-purple)"
	></div>
	<div
		class="sp sp-slow"
		style="top:558.6px;left:415.5px;

--sz:9.4px;--c:var(--clst-white)"
	></div>
	<div
		class="sp sp-slow"
		style="top:1057.5px;left:286.0px;

--sz:6.6px;--c:var(--clst-pink)"
	></div>
	<div
		class="sp sp-med"
		style="top:720.9px;left:825.0px;

--sz:7.5px;--c:var(--clst-purple-dim)"
	></div>
	<div
		class="sp sp-med"
		style="top:164.9px;left:782.0px;

--sz:13.6px;--c:var(--clst-pink)"
	></div>
	<div
		class="sp sp-med"
		style="top:143.9px;left:1175.1px;

--sz:10.2px;--c:var(--clst-purple)"
	></div>
	<div
		class="sp sp-med"
		style="top:287.2px;left:950.1px;

--sz:6.6px;--c:var(--clst-pink-dim)"
	></div>
	<div
		class="sp sp-med"
		style="top:349.2px;left:307.9px;

--sz:13.0px;--c:hsl(220deg 20% 92%)"
	></div>
	<div
		class="sp sp-med"
		style="top:312.1px;left:4.3px;

--sz:12.8px;--c:hsl(240deg 15% 95%)"
	></div>
	<div
		class="sp sp-med"
		style="top:654.9px;left:259.3px;

--sz:10.9px;--c:hsl(240deg 15% 95%)"
	></div>
	<div
		class="sp sp-med"
		style="top:687.9px;left:822.7px;

--sz:10.7px;--c:var(--clst-purple)"
	></div>
	<div
		class="sp sp-fast"
		style="top:854.8px;left:1411.5px;

--sz:7.6px;--c:var(--clst-white)"
	></div>
	<div
		class="sp sp-fast"
		style="top:200.3px;left:648.7px;

--sz:10.4px;--c:var(--clst-white)"
	></div>
	<div
		class="sp sp-fast"
		style="top:492.6px;left:579.7px;

--sz:6.2px;--c:var(--clst-cyan)"
	></div>
	<div
		class="sp sp-fast"
		style="top:59.7px;left:834.4px;

--sz:14.7px;--c:var(--clst-cyan)"
	></div>
	<div
		class="sp sp-fast"
		style="top:780.9px;left:1800.4px;

--sz:14.4px;--c:var(--clst-purple)"
	></div>
	<div
		class="sp sp-fast"
		style="top:825.6px;left:1488.0px;

--sz:6.4px;--c:var(--clst-purple)"
	></div>
	<div
		class="sp sp-fast"
		style="top:352.3px;left:1621.9px;

--sz:12.3px;--c:hsl(220deg 20% 92%)"
	></div>
	<div
		class="sp sp-fast"
		style="top:666.6px;left:1190.7px;

--sz:12.0px;--c:var(--clst-pink-dim)"
	></div>
</div>

<style>
	/* ═══════════════════════════════════════════════════
     CELESTIAL HERO — Pure HTML/CSS, zero JavaScript
     ═══════════════════════════════════════════════════
     ~10 DOM elements instead of ~200. Round stars are
     rendered entirely via box-shadow on 3 divs. Pointed
     stars kept as minimal divs (24) grouped by speed.
  */

	.clst-hero {
		--clst-pink: hsl(324deg 84% 65%);
		--clst-gold: hsl(52deg 99% 62%);
		--clst-cyan: hsl(195deg 100% 49%);
		--clst-purple: hsl(267deg 72% 63%);
		--clst-pink-dim: hsl(324deg 60% 65% / 60%);
		--clst-gold-dim: hsl(52deg 80% 62% / 60%);
		--clst-cyan-dim: hsl(195deg 80% 49% / 60%);
		--clst-purple-dim: hsl(267deg 55% 63% / 60%);
		--clst-space: hsl(230deg 30% 5%);
		--clst-white: hsl(0deg 0% 100%);

		position: relative;
		width: 100%;
		aspect-ratio: 16 / 9;
		overflow: hidden;
	}

	/* ── Responsive alternative (uncomment to use):
  .clst-hero {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    background: var(--clst-space);
    overflow: hidden;
  }
  ── */

	/* ═══════════════════════════════════════
     ROUND STARS — box-shadow layers
     ═══════════════════════════════════════
     Each div is 1×1px, invisible itself.
     All star positions live in box-shadow.
     3 divs = 3 animation speeds. */

	.clst-stars-slow,
	.clst-stars-med,
	.clst-stars-fast {
		position: absolute;
		top: 0;
		left: 0;
		width: 1px;
		height: 1px;
		background: transparent;
		will-change: opacity;
	}

	.clst-stars-slow {
		animation: clst-pulse 4s ease-in-out infinite;
	}

	.clst-stars-med {
		animation: clst-pulse 2.8s ease-in-out infinite -1.2s;
	}

	.clst-stars-fast {
		animation: clst-pulse 1.8s ease-in-out infinite -0.6s;
	}

	@keyframes clst-pulse {
		0%,
		100% {
			opacity: 0.35;
		}

		50% {
			opacity: 1;
		}
	}

	/* Star positions (generated, ~47 per group) */

	/* ── Slow twinkle group ── */
	.clst-stars-slow {
		box-shadow:
			713.6px 352.5px 0 1px var(--clst-gold-dim),
			1452.3px 763.5px 0 1.3px var(--clst-pink-dim),
			1705.9px 729.3px 0 0.7px var(--clst-gold-dim),
			545.7px 1071.6px 0 1.3px var(--clst-cyan-dim),
			686.3px 726.3px 0 0.9px var(--clst-white),
			1804.2px 268.2px 0 0.6px hsl(220deg 20% 92%),
			1706.1px 516.6px 0 0.8px hsl(267deg 72% 63%),
			618.7px 541.2px 0 1.3px hsl(324deg 84% 65%),
			1061.9px 728.7px 0 0.9px var(--clst-gold-dim),
			1389.6px 931.8px 0 1.4px hsl(220deg 20% 92%),
			1440.7px 1077.7px 0 1px var(--clst-white),
			620.9px 635.7px 0 1px var(--clst-pink-dim),
			348.4px 571.5px 0 0.7px hsl(324deg 84% 65%),
			524.6px 732.5px 0 1.2px hsl(52deg 99% 62%),
			1872.1px 548.6px 0 1.5px hsl(267deg 72% 63%),
			192.5px 623.5px 0 0.4px hsl(220deg 20% 92%),
			1133.2px 462.9px 0 1.5px hsl(267deg 72% 63%),
			1042px 307.2px 0 0.5px hsl(195deg 100% 49%),
			658.9px 446.2px 0 1.3px var(--clst-purple-dim),
			977px 890.2px 0 0.7px var(--clst-pink-dim),
			1740.4px 331.8px 0 0.4px hsl(195deg 100% 49%),
			557.4px 419.7px 0 0.9px hsl(324deg 84% 65%),
			333.1px 32px 0 0.9px hsl(324deg 84% 65%),
			717.3px 750.2px 0 1.5px hsl(324deg 84% 65%),
			93.8px 581.2px 0 0.6px var(--clst-cyan-dim),
			1372.6px 78.7px 0 0.4px hsl(220deg 20% 92%),
			1426.7px 360px 0 0.8px hsl(220deg 20% 92%),
			106.2px 809.1px 0 0.9px hsl(267deg 72% 63%),
			891.4px 391.5px 0 1.2px hsl(324deg 84% 65%),
			139.7px 680.3px 0 0.9px hsl(52deg 99% 62%),
			149.9px 427.3px 0 0.6px hsl(195deg 100% 49%),
			763.2px 592px 0 1.5px hsl(52deg 99% 62%),
			1851.9px 319.7px 0 0.4px var(--clst-white),
			77.7px 572.8px 0 1px var(--clst-gold-dim),
			1909.1px 566.7px 0 0.7px hsl(324deg 84% 65%),
			1084px 296.4px 0 0.6px hsl(195deg 100% 49%),
			625.3px 814.5px 0 1.3px var(--clst-white),
			1277.8px 1054.8px 0 1.5px hsl(324deg 84% 65%),
			96.9px 113.2px 0 1.2px var(--clst-white),
			701.3px 61.8px 0 0.8px hsl(324deg 84% 65%),
			288.8px 136.5px 0 0.4px hsl(220deg 20% 92%),
			713.9px 290.2px 0 1px hsl(267deg 72% 63%),
			126.5px 488.4px 0 1.2px hsl(52deg 99% 62%),
			394.4px 15px 0 1.2px var(--clst-white),
			168.2px 152.4px 0 1.2px hsl(220deg 20% 92%),
			186.6px 519.8px 0 0.6px hsl(324deg 84% 65%),
			1780.2px 312.5px 0 0.6px hsl(220deg 20% 92%);
	}

	/* ── Medium twinkle group ── */
	.clst-stars-med {
		box-shadow:
			1564.9px 800.3px 0 0.4px hsl(220deg 20% 92%),
			474.7px 309.6px 0 0.9px hsl(52deg 99% 62%),
			1584.1px 611.4px 0 0.7px var(--clst-cyan-dim),
			113.6px 17.9px 0 1.2px var(--clst-white),
			929.2px 65.2px 0 0.4px hsl(324deg 84% 65%),
			1157.4px 287px 0 0.8px hsl(220deg 20% 92%),
			1400.9px 42.8px 0 1.1px hsl(220deg 20% 92%),
			563.2px 811.3px 0 1.3px hsl(267deg 72% 63%),
			827.2px 777.5px 0 1.2px var(--clst-pink-dim),
			1507.1px 881.2px 0 0.6px hsl(220deg 20% 92%),
			1014.7px 388.6px 0 0.4px var(--clst-purple-dim),
			663.7px 66.1px 0 0.5px hsl(240deg 15% 95%),
			1417.9px 710.3px 0 0.9px hsl(240deg 15% 95%),
			1704.9px 1074.6px 0 0.8px var(--clst-purple-dim),
			844.1px 387.7px 0 1.3px hsl(267deg 72% 63%),
			880.1px 389.6px 0 0.8px var(--clst-cyan-dim),
			243.9px 321.7px 0 0.4px hsl(52deg 99% 62%),
			1445.4px 654.4px 0 0.8px hsl(52deg 99% 62%),
			239.3px 72.9px 0 0.4px hsl(220deg 20% 92%),
			1717.4px 462.9px 0 1.4px hsl(195deg 100% 49%),
			1744.7px 1003px 0 1.2px var(--clst-white),
			1545.7px 485.4px 0 1.4px var(--clst-white),
			1686.1px 618.5px 0 0.5px hsl(220deg 20% 92%),
			1295.6px 465.6px 0 1.5px hsl(267deg 72% 63%),
			945.9px 589.8px 0 0.5px var(--clst-white),
			1641.3px 1035.9px 0 1.3px hsl(324deg 84% 65%),
			539.6px 996.3px 0 0.4px var(--clst-white),
			1901.5px 376.9px 0 1.3px var(--clst-white),
			1587.3px 800.4px 0 1.5px var(--clst-cyan-dim),
			1392.5px 795.6px 0 1px hsl(220deg 20% 92%),
			768.5px 265.3px 0 0.6px hsl(195deg 100% 49%),
			28.8px 680.9px 0 1px var(--clst-cyan-dim),
			706.7px 52.2px 0 0.7px hsl(195deg 100% 49%),
			319.2px 683.1px 0 0.4px hsl(195deg 100% 49%),
			431.4px 521.6px 0 0.9px hsl(240deg 15% 95%),
			1098.1px 297.6px 0 1.3px hsl(220deg 20% 92%),
			1033.6px 463.7px 0 0.7px var(--clst-purple-dim),
			820.5px 179.1px 0 1.5px hsl(195deg 100% 49%),
			1881.4px 808.8px 0 1.1px hsl(195deg 100% 49%),
			1435.6px 678.2px 0 1.1px hsl(195deg 100% 49%),
			245.2px 794.1px 0 0.8px var(--clst-cyan-dim),
			335.6px 280.6px 0 0.8px var(--clst-purple-dim),
			494.2px 681.6px 0 0.4px hsl(240deg 15% 95%),
			429.9px 426.2px 0 0.3px hsl(240deg 15% 95%),
			665.4px 704.2px 0 0.8px var(--clst-white),
			1896.8px 621.9px 0 0.3px hsl(195deg 100% 49%),
			1411.6px 509.1px 0 1px hsl(220deg 20% 92%);
	}

	/* ── Fast twinkle group ── */
	.clst-stars-fast {
		box-shadow:
			976.2px 1041.4px 0 1.2px hsl(52deg 99% 62%),
			1611.2px 118px 0 0.4px var(--clst-purple-dim),
			843.1px 1032px 0 1.3px var(--clst-purple-dim),
			1688.3px 160.7px 0 0.8px var(--clst-purple-dim),
			433.9px 419.5px 0 1.2px var(--clst-white),
			1071.1px 330.6px 0 0.8px hsl(240deg 15% 95%),
			1030.9px 1009.8px 0 1.2px hsl(267deg 72% 63%),
			1422.2px 355.8px 0 0.7px var(--clst-cyan-dim),
			1631.4px 133.4px 0 0.8px hsl(324deg 84% 65%),
			1638.2px 946.4px 0 0.9px hsl(52deg 99% 62%),
			1751.7px 44px 0 1.4px hsl(240deg 15% 95%),
			780.3px 72.8px 0 0.5px var(--clst-white),
			424.9px 1028.2px 0 0.7px var(--clst-gold-dim),
			1450.3px 977.6px 0 0.7px hsl(240deg 15% 95%),
			1164.9px 312px 0 1.3px var(--clst-gold-dim),
			651.6px 416.4px 0 0.3px hsl(267deg 72% 63%),
			559.4px 638.7px 0 0.9px hsl(240deg 15% 95%),
			240.6px 1053.1px 0 1.1px var(--clst-cyan-dim),
			1912.2px 758.8px 0 1.1px hsl(52deg 99% 62%),
			675px 733.5px 0 0.9px hsl(240deg 15% 95%),
			144.9px 781.4px 0 0.3px hsl(324deg 84% 65%),
			566.5px 254.8px 0 1.1px var(--clst-white),
			1316.8px 124px 0 0.6px hsl(324deg 84% 65%),
			1736.9px 330.2px 0 0.6px hsl(195deg 100% 49%),
			775.7px 904.2px 0 1.3px hsl(240deg 15% 95%),
			1208.9px 778.4px 0 0.7px var(--clst-white),
			1296.3px 1046.1px 0 0.3px hsl(220deg 20% 92%),
			306.5px 114.9px 0 0.7px var(--clst-white),
			81.6px 978.4px 0 1.1px hsl(324deg 84% 65%),
			1717.7px 281.8px 0 0.4px var(--clst-cyan-dim),
			723.8px 1060px 0 0.4px hsl(52deg 99% 62%),
			210.8px 691px 0 0.3px hsl(267deg 72% 63%),
			1688.2px 747.6px 0 0.9px var(--clst-white),
			1309.4px 53.6px 0 1px hsl(324deg 84% 65%),
			1784.8px 965.5px 0 0.7px hsl(220deg 20% 92%),
			1619.2px 115.4px 0 1px hsl(220deg 20% 92%),
			1285.1px 108.2px 0 1.2px hsl(267deg 72% 63%),
			1603px 662.1px 0 1.5px hsl(220deg 20% 92%),
			842.8px 40.8px 0 1.4px hsl(324deg 84% 65%),
			1132.8px 41.5px 0 0.4px var(--clst-white),
			1150.6px 424.5px 0 1.2px var(--clst-purple-dim),
			1476.4px 460.5px 0 1.3px var(--clst-purple-dim),
			1362px 452.8px 0 0.7px hsl(195deg 100% 49%),
			535.3px 547.4px 0 0.7px hsl(220deg 20% 92%),
			1607.6px 511.3px 0 1.3px hsl(220deg 20% 92%),
			1379px 906.1px 0 1.3px hsl(267deg 72% 63%);
	}

	/* ═══════════════════════════════════════
     POINTED 4-SPIKE STARS
     ═══════════════════════════════════════
     24 total in 3 speed groups. Only --sz
     and --c vary per element; timing is
     class-driven. */

	.sp {
		position: absolute;
		width: var(--sz, 8px);
		height: var(--sz, 8px);
		will-change: opacity, transform;
	}

	.sp::before,
	.sp::after {
		position: absolute;
		content: "";
		background: var(--c, var(--clst-white));
		border-radius: 50%;
	}

	.sp::before {
		top: 36%;
		left: 0;
		width: 100%;
		height: 28%;
	}

	.sp::after {
		top: 0;
		left: 36%;
		width: 28%;
		height: 100%;
	}

	.sp-slow {
		animation: clst-sparkle 5s ease-in-out infinite;
	}

	.sp-med {
		animation: clst-sparkle 3.5s ease-in-out infinite -1.5s;
	}

	.sp-fast {
		animation: clst-sparkle 2.2s ease-in-out infinite -0.8s;
	}

	@keyframes clst-sparkle {
		0%,
		100% {
			opacity: 0.1;
			transform: scale(0.8) rotate(0deg);
		}

		50% {
			opacity: 0.95;
			transform: scale(1.25) rotate(18deg);
		}
	}
</style>
