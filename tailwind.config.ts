import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        red: { DEFAULT: "#CC292A", deep: "#A82122", soft: "#FBEEEE", line: "#EFCFCE" },
        ink: "#2B2A28",
        bg: "#F7F6F4",
        card: "#FFFFFF",
        soft: "#F3F1EE",
        edge: "#E6E2DC",
        edgeStrong: "#CFC9C1",
        muted: "#8A857D",
      },
      fontFamily: {
        sans: ["var(--font-archivo)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
