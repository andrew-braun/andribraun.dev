import type { Picture } from "@sveltejs/enhanced-img";
import type { Component } from "svelte";
import type { SVGAttributes } from "svelte/elements";

/**
 * `src` matches what `<enhanced:img>` accepts: a `?enhanced` import (Picture)
 * or a plain URL string.
 */
export interface ImageDataProps {
	alt: string;
	src: string | Picture;
}

/** An unplugin-icons component, which renders an <svg> and forwards SVG attributes. */
export type IconComponent = Component<SVGAttributes<SVGSVGElement>>;
