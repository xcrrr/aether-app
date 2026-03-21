import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          base: "var(--bg-base)",
          sidebar: "var(--bg-sidebar)",
          surface: "var(--bg-surface)",
          hover: "var(--bg-hover)",
          active: "var(--bg-active)",
        },
        violet: {
          primary: "var(--violet-primary)",
          dark: "var(--violet-dark)",
          deep: "var(--violet-deep)",
          light: "var(--violet-light)",
          tint: "var(--violet-tint)",
          border: "var(--violet-border)",
        },
        agent: {
          alpha1: "var(--agent-alpha1)",
          "alpha1-tint": "var(--agent-alpha1-tint)",
        },
        green: {
          primary: "var(--green-primary)",
          dark: "var(--green-dark)",
          tint: "var(--green-tint)",
        },
        red: {
          primary: "var(--red-primary)",
          dark: "var(--red-dark)",
          tint: "var(--red-tint)",
        },
        amber: {
          primary: "var(--amber-primary)",
          dark: "var(--amber-dark)",
          tint: "var(--amber-tint)",
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          tertiary: "var(--text-tertiary)",
        },
        border: {
          subtle: "var(--border-subtle)",
          default: "var(--border-default)",
          strong: "var(--border-strong)",
        },
      },
      width: {
        sidebar: "260px",
        "sidebar-collapsed": "52px",
      },
      transitionDuration: {
        base: "220ms",
      },
      fontWeight: {
        normal: "400",
        medium: "500",
      },
    },
  },
  plugins: [],
};
export default config;
