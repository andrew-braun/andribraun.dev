import { describe, expect, it } from "vitest";
import { tabIndexFromKey } from "./tabs";

describe("tabIndexFromKey", () => {
	it("wraps left from the first tab and right from the last", () => {
		expect(tabIndexFromKey("ArrowLeft", 0, 4)).toBe(3);
		expect(tabIndexFromKey("ArrowRight", 3, 4)).toBe(0);
	});

	it("moves one step for in-range arrows", () => {
		expect(tabIndexFromKey("ArrowLeft", 2, 4)).toBe(1);
		expect(tabIndexFromKey("ArrowRight", 1, 4)).toBe(2);
	});

	it("jumps to the first and last tabs", () => {
		expect(tabIndexFromKey("Home", 2, 4)).toBe(0);
		expect(tabIndexFromKey("End", 0, 4)).toBe(3);
	});

	it("ignores unrelated keys and empty lists", () => {
		expect(tabIndexFromKey("ArrowDown", 1, 4)).toBeNull();
		expect(tabIndexFromKey("Tab", 1, 4)).toBeNull();
		expect(tabIndexFromKey("ArrowRight", 0, 0)).toBeNull();
	});
});
