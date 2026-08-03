declare module "typewriter-effect/dist/core" {
	type Delay = number | "natural";

	interface TypewriterOptions {
		loop?: boolean;
		cursor?: string;
		delay?: Delay;
		changeDelay?: Delay;
		cursorClassName?: string;
		autoStart?: boolean;
	}

	export default class Typewriter {
		constructor(container: HTMLElement | string, options?: TypewriterOptions);
		pauseFor(milliseconds: number): this;
		typeString(text: string): this;
		start(): this;
	}
}
