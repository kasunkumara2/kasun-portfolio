import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          900: "#060A14",
          800: "#0B1224",
          700: "#0F1A33",
        },
        neon: {
          pink: "#FF2BD6",
          purple: "#7C3AED",
          blue: "#22D3EE",
        }
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(124, 58, 237, 0.25), 0 12px 40px rgba(0,0,0,0.55)",
        neon: "0 0 18px rgba(255, 43, 214, 0.35), 0 0 44px rgba(124, 58, 237, 0.25)",
      },
      backgroundImage: {
        "hero-gradient": "radial-gradient(1000px 700px at 85% 25%, rgba(124,58,237,.35), transparent 60%), radial-gradient(900px 600px at 15% 65%, rgba(34,211,238,.18), transparent 55%), linear-gradient(180deg, rgba(6,10,20,1), rgba(11,18,36,1))",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" }
        }
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 8s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
