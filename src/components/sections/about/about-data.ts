import AndriNerdModePicture from "$lib/assets/img/profile/andri-nerd-mode.png?enhanced";
import AndriPersonalModePicture from "$lib/assets/img/profile/andri-personal-mode.png?enhanced";
import AndriProfessionalModePicture from "$lib/assets/img/profile/andri-professional-mode.png?enhanced";
import type { ImageDataProps } from "$root/src/ts/general";

interface AboutTab {
	title: string;
	id: string;
	image: ImageDataProps;
	text: string;
}

interface AboutData {
	descriptions: {
		professional: AboutTab;
		personal: AboutTab;
		nerd: AboutTab;
	};
}

export const aboutData: AboutData = {
	descriptions: {
		professional: {
			title: "Professional Mode",
			id: "professional",
			image: {
				src: AndriProfessionalModePicture,
				alt: "Profile picture of Andri Braun in 'professional mode'. They are standing in front of a window with a large lit-up building directly behind them and a purple twilight city skyline visible behind it to the right."
			},
			text: `
Hello, I’m Andri Braun—an American full-stack web developer with a passion for building modern, efficient websites. Whether it’s creating new sites from scratch, optimizing outdated systems, or solving complex issues, I bring flexibility, reliability, and a problem-solving mindset to every project.

I specialize in:
- **JavaScript** – The backbone of modern web functionality.
- **CSS** – Crafting visually stunning, responsive designs.
- **WordPress/PHP** – Powering dynamic sites, from small blogs to major platforms.

Want to dive deeper into the tech I use? Check out the "Nerd Mode" tab.

---

### What Does Working Together Look Like?
Every project is unique, but here’s a general workflow:
1. **Initial Contact**: You share your project details.
2. **Feasibility Review**: I evaluate the scope and ask follow-up questions if needed.
3. **Proposal**: I provide a time estimate, projected completion date, and hourly rate.
4. **Project Execution**: I track progress using tools like Trello and keep you updated regularly.
5. **Completion & Support**: Once the project is live, I offer ongoing maintenance and support tailored to your needs—ranging from occasional updates to more dedicated time for complex systems.

---

### My Journey as a Developer
I’ve been a web developer since graduating in 2014, with experience spanning multiple roles, including writer and English teacher. These roles honed my communication skills and reinforced my love for teaching, especially when it comes to sharing my knowledge of code. Today, I channel that enthusiasm into delivering exceptional web solutions and empowering clients to understand the process.
            `
		},
		personal: {
			title: "Personal Mode",
			id: "personal",
			image: {
				src: AndriPersonalModePicture,
				alt: "Profile picture of Andri Braun in 'personal mode'. They are standing in front of a window with a large lit-up building directly behind them and a purple twilight city skyline visible behind it to the right."
			},
			text: `
My family's first computer ran Windows 95. The modem actually made those weird 90s noises and blocked the phone lines. That was the soundtrack to the awakening of my inner computer nerd. I quickly became both the person most likely to break the computer and the person who could fix it when something went wrong (it wasn't my fault every time, really!).

I subsequently went through several other nerd phases—literature, history, theater, economics—but I was never able to escape my destiny: *"person who is good with computers."* So, I worked in the tech department in university while studying history and sociology and kept working as a web developer there after I graduated in 2014.

I took a break from tech to teach English in South Korea and briefly pursued a graduate degree in economics, but after learning Python to analyze economic data, I finally realized that I enjoyed programming more than anything else I'd ever done... so by 2019 I had started learning web development.

By 2020, I was building websites for clients and devouring all the tech knowledge I could in my spare time. I also bought too many domain names for all my aspirational side projects. That’s pretty much what I’m still doing! How many side projects have I finished, you ask? Well, I, hmm... how many side projects have *you* finished?

Anyway, my computer runs Windows 11 now, and it doesn't make those cool 90s noises when I go online (I'd at least like the option!), but I'm still basically the same computer geek. Time never goes by faster for me than when I'm solving problems and making new things.

Luckily, my eclectic panoply (I was a writer and English teacher, remember!) of studies, careers, and hobbies have left me with some pretty good communication skills and the ability to thrive both independently and as part of a team. If you want to hire me for web stuff, or just ask a few quick questions, get in touch! I'd love to hear from you.

---

### Random Things About Me

You want to read *MORE* about me? Gosh, I'm flattered! All right then, here are a few facts about me that might help you get a read on me as a person :)

- **In the U.S.** I've lived in New Jersey, Pennsylvania, and Tennessee, in that order.
- I currently live in **Tbilisi, Georgia** (the country!).
- I've lived in **Italy**, **South Korea**, **Thailand**, and **Georgia** and visited many other countries along the way.
- **I'm a runner!** I do half-marathons and trail runs whenever I can.
- One of my favorite music genres is **synthwave**. Never heard of it? Check out my playlist!
- I love learning **alphabets**! I know Latin, Korean, Georgian, Russian, Ukrainian, and Greek so far, but that list will grow. I'm working on Armenian and have my sights on Amharic, Japanese (Hiragana/Katakana), Thai, and Arabic.
- I love **board games**, and have accumulated a pretty significant collection despite my best efforts to not have too much stuff. Some favorites: *Betrayal at the House on the Hill*, *Not Alone*, *Kana Gawa*, and *Dominion*.
- My top three **video games**: *Mass Effect*, *Bioshock*, *Civilization*.
- I've been fermenting things for years—starting with **mead** (honey wine), but now mostly making a kimchi/sauerkraut hybrid. Love those magical little microbes!
- I make an excellent **green curry pasta**—it's weird but it works!
- I love playing **electric guitar** when I can get my hands on one, and I'm working on getting past *"Hot Cross Buns"* on the pan flute.
`
		},
		nerd: {
			title: "Nerd Mode",
			id: "nerd",
			image: {
				src: AndriNerdModePicture,
				alt: "Profile picture of Andri Braun in 'nerd mode'. They are standing in front of a window with a large lit-up building directly behind them and a purple twilight city skyline visible behind it to the right."
			},
			text: `If you went straight to this tab, congratulations--you're probably a developer and/or a nerd. If you don't identify as either of those things, you might not know exactly what all this means, but it could potentially sound impressive, so maybe give it a quick scan anyway and hopefully you'll end up thinking I'm brilliant.`
		}
	}
};
