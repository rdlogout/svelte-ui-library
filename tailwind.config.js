/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin";

export default {
	content: ["./src/**/*.{html,js,svelte,ts}", "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}"],
	theme: {
		container: {
			width: {
				DEFAULT: "100%",
				sm: "640px",
				md: "768px",
				lg: "1024px",
				xl: "1280px",
				"2xl": "1280px",
			},
			padding: {
				DEFAULT: "0rem",
				sm: "2rem",
				lg: "4rem",
				xl: "5rem",
				"2xl": "6rem",
			},
		},

		extend: {
			boxShadow: {
				shadow: "rgba(0, 0, 0, 0.05) 0px 0.0625rem 0.1875rem, rgba(0, 0, 0, 0.1) 0px 0.0625rem 0.125rem",
			},
			colors: {
				magnum: {
					50: "#fff9ed",
					100: "#fef2d6",
					200: "#fce0ac",
					300: "#f9c978",
					400: "#f7b155",
					500: "#f38d1c",
					600: "#e47312",
					700: "#bd5711",
					800: "#964516",
					900: "#793a15",
					950: "#411c09",
				},
				// Add more colors as needed
			},
		},
		fontFamily: {
			sans: ["Overpass", "sans-serif"],
		},
		fontSize: {
			tiny: "10px",
			xs: "12px",
			sm: "12.5px",
			base: "13px",
			md: "14px",
			lg: "15px",
			xl: "16px",
			"2xl": "18px",
			"3xl": "20px",
			"4xl": "23px",
			"5xl": "27px",
			"6xl": "32px",
		},
	},
	plugins: [
		function ({ addVariant, e }) {
			addVariant("not-first", ({ modifySelectors, separator }) => {
				modifySelectors(({ className }) => {
					return `.${e(`not-first${separator}${className}`)}:not(:first-child)`;
				});
			});
			addVariant("not-last", ({ modifySelectors, separator }) => {
				modifySelectors(({ className }) => {
					return `.${e(`not-last${separator}${className}`)}:not(:last-child)`;
				});
			});
		},
		function ({ addComponents, theme }) {
			const buttons = {};
			const colors = theme("colors");
			Object.keys(colors).forEach((color) => {
				buttons[`.btn-soft-${color}`] = {
					"@apply py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md font-semibold hover:text-white focus:outline-none focus:ring-2 ring-offset-white focus:ring-offset-2 transition-all text-sm":
						{},
					backgroundColor: theme(`colors.${color}.100`),
					color: theme(`colors.${color}.500`),
					"&:hover": {
						backgroundColor: theme(`colors.${color}.500`),
					},
					"&:focus": {
						ringColor: theme(`colors.${color}.500`),
					},
				};
			});

			addComponents(buttons);
		},
		function ({ addComponents, theme }) {
			const colors = theme("colors");
			const alertComponents = Object.keys(colors).reduce((acc, key) => {
				return {
					...acc,
					[`.alert-${key}`]: {
						backgroundColor: theme(`colors.${key}.100`),
						color: theme(`colors.${key}.600`),
					},
				};
			}, {});

			addComponents(alertComponents);
		},
		plugin(function ({ addVariant, matchUtilities, theme }) {
			addVariant("hocus", ["&:hover", "&:focus"]);
			// Square utility
			matchUtilities(
				{
					square: (value) => ({
						width: value,
						height: value,
					}),
				},
				{ values: theme("spacing") }
			);
		}),
	],
};
