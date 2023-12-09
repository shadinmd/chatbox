import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				"chat-black": "#101010",
				"chat-blue": "#397FFF",
				"chat-red": "#FF3E3E",
				"chat-green": "#3AFF1A",
				"chat-yellow": "#FFE923",
				"chat-violet": "#BD00FF"
			}
		},
	},
	plugins: [],
}
export default config
