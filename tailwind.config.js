// export default {
//   darkMode: "class",
//   content: [
//     "./index.html",
//     "./src/**/*.{js,jsx,ts,tsx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         slate: {
//           50: "#F7F7F8",
//           100: "#EDEDF0",
//           200: "#D4D4D9",
//           300: "#ABADB4",
//           400: "#8A8C93",
//           500: "#6B6D74",
//           600: "#525359",
//           700: "#3A3B42",
//           800: "#26272E",
//           900: "#1C1D23",
//           950: "#101014",
//         },
//         indigo: {
//           300: "#8991E8",
//           400: "#7680DE",
//           500: "#5E6AD2",
//           600: "#4C58C4",
//           700: "#3D47A0",
//         },
//         emerald: {
//           300: "#86D3AE",
//           400: "#5FC08F",
//           500: "#4CB782",
//         },
//         amber: {
//           300: "#E8C874",
//           400: "#DDB94F",
//           500: "#D4A72C",
//         },
//         rose: {
//           300: "#F0A6AA",
//           400: "#EC848A",
//           500: "#E5484D",
//         },
//       },
//       keyframes: {
//         slideIn: {
//           "0%": { opacity: "0", transform: "translateX(20px)" },
//           "100%": { opacity: "1", transform: "translateX(0)" },
//         },
//       },
//     },
//   },
//   plugins: [],
// };

// tailwind.config.js
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Inter'", "'Segoe UI'", "sans-serif"],
      },
      colors: {
        // Warm mocha-grey neutral scale — replaces `slate` everywhere
        neutral: {
          50:  "#FAF7F4",
          100: "#F3EDE7",
          200: "#E4D9CD",
          300: "#CBB9A8",
          400: "#A8927E",
          500: "#8A7566",
          600: "#6B584B",
          700: "#4F4038",
          800: "#372C26",
          900: "#241C18",
          950: "#17110E",
        },
        // Deep cocoa — the brand / primary action color
        primary: {
          50:  "#FBF3EC",
          100: "#F3E1CF",
          200: "#E5C29F",
          300: "#D4A171",
          400: "#BE7F49",
          500: "#9C6136", // core
          600: "#7C4C2A",
          700: "#5F3A21",
          800: "#452A18",
          900: "#2E1B10",
          950: "#1A0F09",
        },
        // Warm caramel/tan — secondary actions, highlights
        secondary: {
          50:  "#FBF6EE",
          100: "#F4E7CE",
          200: "#E8CC9E",
          300: "#DAAF6E",
          400: "#C99548",
          500: "#B37D33", // core
          600: "#8F6327",
          700: "#6D4C1F",
          800: "#4C3517",
          900: "#33240F",
        },
        success: { 300: "#B4C79A", 400: "#8FA876", 500: "#6E8A54" },
        warning: { 300: "#EDCA84", 400: "#E0B457", 500: "#C99A38" },
        danger:  { 300: "#DDA294", 400: "#C97B63", 500: "#AD5A42" },
      },
      boxShadow: {
        warm: "0 4px 20px rgba(60, 40, 25, 0.12)",
        "warm-lg": "0 12px 40px rgba(60, 40, 25, 0.18)",
      },
      keyframes: {
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};