/** @type {import('tailwindcss').Config} */
const primeui = require('tailwindcss-primeui');
module.exports = {
    darkMode: ['selector', '[class="p-dark"]'],
    content: ['./src/**/*.{html,ts,scss,css}', './src/index.html', './node_modules/primeng/**/*.{html,ts}'],
    plugins: [primeui,
      function ({ addUtilities }) {
        addUtilities({
            '.text-shadow-sm': {
                'text-shadow': '1px 1px 2px rgba(0, 0, 0, 0.2)',
            },
            '.text-shadow-md': {
                'text-shadow': '2px 2px 4px rgba(0, 0, 0, 0.3)',
            },
            '.text-shadow-lg': {
                'text-shadow': '4px 4px 8px rgba(0, 0, 0, 0.4)',
            },
        });
    },
    ],
    theme: {
        screens: {
            sm: '576px',
            md: '768px',
            lg: '992px',
            xl: '1200px',
            '2xl': '1920px'
        },
        boxShadow: {
          'sm': '1px 1px 2px rgba(0, 0, 0, 0.2)',  // Small shadow
          'md': '2px 2px 4px rgba(0, 0, 0, 0.3)',  // Medium shadow
          'lg': '4px 4px 8px rgba(0, 0, 0, 0.4)',  // Larger shadow
                          // RTL versions
           'sm-rtl': '-1px 1px 2px rgba(0, 0, 0, 0.2)',
                'md-rtl': '-2px 2px 4px rgba(0, 0, 0, 0.3)',
                'lg-rtl': '-4px 4px 8px rgba(0, 0, 0, 0.4)',
        }
    }
};
