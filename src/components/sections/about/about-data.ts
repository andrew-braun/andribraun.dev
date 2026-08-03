import AndriNerdModePicture from "$lib/assets/img/profile/andri-nerd-mode.png?enhanced";
import AndriPersonalModePicture from "$lib/assets/img/profile/andri-personal-mode.png?enhanced";
import AndriProfessionalModePicture from "$lib/assets/img/profile/andri-professional-mode.png?enhanced";
import type { ImageDataProps } from "$ts/general";

interface AboutTab {
	title: string;
	id: string;
	image?: ImageDataProps;
	text: string;
}

interface AboutData {
	descriptions: {
		professional: AboutTab;
		personal: AboutTab;
		nerd: AboutTab;
		facts: AboutTab;
	};
}

export const aboutData: AboutData = {
	descriptions: {
		personal: {
			title: "Personal Mode",
			id: "personal",
			image: {
				src: AndriPersonalModePicture,
				alt: "Profile picture of Andri Braun in 'personal mode'. They are standing in front of a window with a large lit-up building directly behind them and a purple twilight city skyline visible behind it to the right."
			},
			text: `My family's first computer ran Windows 95. The modem actually made those weird 90s noises and blocked the phone lines. That was the soundtrack to the awakening of my inner computer nerd. In short order, I became both the person most likely to break the computer and the person who could fix it when something went wrong (it wasn't my fault every time, really!).

I subsequently went through several other nerd phases--music production, literature, history, theater, economics--but I was never able to escape my destiny: *"person who is good with computers."* Despite studying history and sociology in university, I ended up working as assistant web developer for my university's website before and after graduating. 

I took a break from professional computer nerdery to teach English in South Korea, be a tech journalist, and pursue a graduate degree in economics. After learning Python to analyze economic data, though, I finally realized that the programming part of my course was what really made the light bulb go off... so by 2019 I was back to coding, and since then I've been making things for the internet full-time!

My computer runs Windows 11 and Ubuntu 26 now, and it doesn't make those cool 90s noises when I go online (I'd at least like the option!), but I'm still basically the same computer geek that couldn't get enough of messing around on the family computer. Time never goes by faster for me than when I'm solving problems and making new things.

I like to think that graduating summa cum laude with liberal arts degrees (please let me brag about this, no one ever asks about my GPA and I worked really hard on it :D) and working as a teacher and writer have left me with a pretty healthy mix of hard technical skills and soft, mushy human skills. Weirdly, being a decent writer has been a huge asset when it comes to getting AI to do exactly what I want, so the human skills are somehow coming full circle to also being good with technology. Didn't see that one coming, honestly!

If you want to hire me for web stuff, challenge me to geography trivia, or tell me right to my face exactly what you think of me, please [send me a message](#contact) or gently whisper it to a passing seagull. They know where to find me, but they do demand payment in french fries.`
		},
		professional: {
			title: "Professional Mode",
			id: "professional",
			image: {
				src: AndriProfessionalModePicture,
				alt: "Profile picture of Andri Braun in 'professional mode'. They are standing in front of a window with a large lit-up building directly behind them and a purple twilight city skyline visible behind it to the right."
			},
			text: `
I'm a full-stack web developer building production applications and websites for businesses of every shape and size, whether it's a solo founder, a shop/restaurant, or a growing company with real engineering needs. 

What sets me apart is my blend of technical expertise and strong communication skills. I have academic/professional experience as a communicator and instructor; combined with my experience as a developer, this allows me to bridge gaps in technical understanding and translate ideas to requirements, whether it's between humans or LLMs.

My primary work is in the modern JavaScript ecosystem, using frameworks with TypeScript, headless CMS architectures, and Node.js backends. As a full-stack dev, I handle frontend, backend, database design, infrastructure, CI/CD, observability, security, etc. across cloud providers, managed hosts, and custom servers.

In an average month, I typically work on:

- Modern JavaScript applications (mostly Astro, Next.js, and SvelteKit)
- Marketing sites, content platforms, and full SaaS products
- Backend and infrastructure (Such as Node.js services, PostgreSQL, APIs, cloud functions, containerized deployments)
- E-commerce (Shopify stores, Shopify apps, WooCommerce builds, custom e-commerce)
- Headless CMS (Like Strapi, Payload, headless WordPress, Emdash, Directus) alongside a solid base of traditional WordPress work using modern frameworks like Bricks Builder.
- DevOps and reliability (Deployment via platforms like Netlify/Vercel/Railroad, CI/CD with GitHub Actions, infrastructure hardening, monitoring, automated backups, incident response)

While I spent most of my career handcoding, I, of course, work fluently with the latest generations of AI-assisted development tools and treat them as a core part of how I deliver work, acting as the senior dev/architect and focusing heavily on spec-driven development. I prioritize code and tooling that helps optimize AI efficiency on a codebase while sticking closely to best practices and making it easy for human reviewers to assess quality and intervene.

As someone constantly updating my AI toolkit, I'm also a useful technical partner for organizations figuring out how to integrate AI tooling into their own engineering practice.

I offer senior-developer judgment with the responsiveness of an independent consultant. For SMB clients, that means a technical partner who explains tradeoffs in plain language. For larger organizations, it means a developer who is equally comfortable integrating with existing teams or being an individual end-to-end product owner. 

If you'd like to discuss a project or engagement, get in touch.
            `
		},
		nerd: {
			title: "Nerd Mode",
			id: "nerd",
			image: {
				src: AndriNerdModePicture,
				alt: "Profile picture of Andri Braun in 'nerd mode'. They are standing in front of a window with a large lit-up building directly behind them and a purple twilight city skyline visible behind it to the right."
			},
			text: `If you went straight to this tab, congratulations--you're probably a developer and/or a nerd. If you don't identify as either of those things, you might not know exactly what all this means, but it could potentially sound impressive, so maybe give it a quick scan anyway. The logos are fun to look at, right? 
			`
		},
		facts: {
			title: "Wow Another Mode",
			id: "facts",
			text: `### Random Things About Me

You want to read *MORE* about me? Gosh, I'm flattered! All right then, here are a few facts about me that might help you get a read on me as a person :)

- **In the U.S.** I've lived in New Jersey, Pennsylvania, and Tennessee, in that order.
- I currently live in **Hua Hin, Thailand**.
- I've lived in **Italy**, **South Korea**, **Thailand**, and **Georgia** (the country) and visited many other countries along the way.
- **I'm a runner!** I do half-marathons and trail runs whenever I can.
- One of my favorite music genres is **synthwave**. Never heard of it? Check out my [playlist](https://open.spotify.com/playlist/1KzSadPoVihKZja0XF8gOY?si=4ba538b070254d6d)!
- I love learning **alphabets**! I know Latin, Korean, Georgian, Russian, Ukrainian, and Greek so far, but that list will grow. I'm working on Armenian and have my sights on Amharic, Japanese (Hiragana/Katakana), Thai, and Arabic.
- I love **board games**, and have accumulated a pretty significant collection despite my best efforts to not have too much stuff. Some favorites: *Betrayal at the House on the Hill*, *Not Alone*, *Kana Gawa*, and *Dominion*.
- My top three **video games**: *Mass Effect*, *Disco Elysium*, *Civilization*.
- I've been fermenting things for years—starting with **mead** (honey wine), but now mostly making a kimchi/sauerkraut hybrid.
- I make an excellent **green curry pasta**—it's weird but it works!
- I love playing **electric guitar** when I can get my hands on one, and I'm working on getting past *"Hot Cross Buns"* on the pan flute.`
		}
	}
};
