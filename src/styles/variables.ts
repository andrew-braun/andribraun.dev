import type { ColorVariant } from "../ts/style";

export const colorVariants: ColorVariant[] = [
	"primary",
	"secondary",
	"accent-1",
	"accent-2",
	"accent-3"
] as const;

export function assignColor(index: number): ColorVariant {
	const colors = colorVariants;
	return colors[index % colors.length];
}
