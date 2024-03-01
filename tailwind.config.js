/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,ts}"],
	prefix: "tw-",
	theme: {
		fontFamily: {
			sans: ["Rubik Variable", "sans-serif"],
		},
		extend: {
			fontFamily: {
				display: "Rubik Variable, sans-serif", // Adds a new `font-display` class
			},
			colors: {
				primary: "#4BAEEF",
				secondary: "#AFFF00",
				"rich-black": "#101322",
				"rich-black-darker": "#0c0e1c",
				// "primary": {
				// 	50: "#FFF0B6",
				// 	100: "#FFE992",
				// 	200: "#FFE26D",
				// 	300: "#FFDB49",
				// 	400: "#FFD324",
				// 	500: "#FFCC00",
				// 	600: "#EDBD00",
				// 	700: "#C8A000",
				// 	800: "#A48300",
				// 	900: "#806600",
				// 	950: "#5B4900",
				// },
				"oxford-blue": {
					50: "#9AA2E0",
					100: "#808AD8",
					200: "#6773D0",
					300: "#4D5CC8",
					400: "#3A49BB",
					500: "#323FA2",
					600: "#2A3589",
					700: "#222B6F",
					800: "#1A2156",
					900: "#13173C",
					950: "#0B0E24",
				},
				cerulean: {
					50: "#edfcfe",
					100: "#d1f6fc",
					200: "#a8ecf9",
					300: "#6cdcf4",
					400: "#29c3e7",
					500: "#0da5cc",
					600: "#0e84ac",
					700: "#126a8c",
					800: "#185772",
					900: "#194960",
					950: "#0a2f42",
				},
			},
		},
		screens: {
			sm: "480px",
			md: "768px",
			lg: "976px",
			xl: "1000px",
		},
		container: {
			padding: {
				DEFAULT: "1rem",
			},
		},
	},
	plugins: [],
};
