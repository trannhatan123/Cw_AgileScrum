// tailwind.config.js
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx,css}',  // make sure your Auth.css is in here
  ],
  theme: {
    // 1) Define your breakpoints
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      // any custom colors/spacing/animation you already have…
      colors: {
        'auth-bg': 'rgba(24,24,24,0.85)',
        // …
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        }
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.4s ease-out forwards',
      }
    },
  },
  variants: {
    extend: {
      // 2) Ensure flexDirection can use responsive prefixes
      flexDirection: ['responsive'],
      // if you’ve customized focus/outline variants, also include:
      ringWidth: ['focus-visible'],
      outline: ['focus-visible'],
    }
  },
  plugins: [
    // your plugins, e.g.:
    // require('tailwindcss-animate'),
    // require('tailwindcss-pseudo-elements'),
  ],
}
