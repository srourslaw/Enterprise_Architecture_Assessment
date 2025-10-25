/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // EA Assessment Dashboard Color Palette
        ea: {
          // Maturity Levels
          base: '#E5E7EB',           // Unanswered/Gray
          critical: '#FEE2E2',       // Maturity 1 - Critical gaps
          developing: '#FED7AA',     // Maturity 2 - Developing
          defined: '#FEF3C7',        // Maturity 3 - Defined
          managed: '#D1FAE5',        // Maturity 4 - Managed
          optimized: '#A7F3D0',      // Maturity 5 - Optimized

          // Interactive
          accent: '#3B82F6',         // Blue for highlights/hover

          // Text and Background
          text: '#1F2937',           // Dark gray text
          background: '#FFFFFF',     // White background
        },
        // Maturity level colors for easier access
        maturity: {
          1: '#FEE2E2',  // Critical
          2: '#FED7AA',  // Developing
          3: '#FEF3C7',  // Defined
          4: '#D1FAE5',  // Managed
          5: '#A7F3D0',  // Optimized
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
