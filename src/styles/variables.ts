import type { ColorVariant } from "../ts/style";

// Typed as a non-empty tuple so `colorVariants[0]` is a guaranteed fallback.
export const colorVariants: [ColorVariant, ...ColorVariant[]] = [
	"primary",
	"secondary",
	"accent-1",
	"accent-2",
	"accent-3"
];

export function assignColor(index: number): ColorVariant {
	// The modulo keeps this in bounds; the `??` is what proves it to the compiler.
	return colorVariants[index % colorVariants.length] ?? colorVariants[0];
}
