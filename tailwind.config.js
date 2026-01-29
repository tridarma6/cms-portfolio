/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.jsx",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
        raluweh: ['Raluweh', 'sans-serif'],
        jakarta: ['PlusJakartaSans', 'sans-serif']
      },
      colors: {
        emerald: {
          50: '#ecfff3',
          100: '#caffdf',
          200: '#9ef5c2',
          300: '#66e9a0',
          DEFAULT: '#2ba45a',
          500: '#00b06a',
          600: '#009958',
          700: '#007a42',
          800: '#055e35',
          900: '#083c26'
        },
        neon: {
          DEFAULT: '#00f58a',
          400: '#7cffb2'
        },
      },
      boxShadow: {
        'neon-sm': '0 6px 30px rgba(0,199,122,0.08)',
        'neon-md': '0 18px 60px rgba(0,199,122,0.12)',
        'glass-lg': '0 10px 40px rgba(0,0,0,0.6)'
      },
      backdropBlur: {
        xs: '4px'
      },
      keyframes: {
        floaty: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
          '100%': { transform: 'translateY(0)' }
        }
      },
      animation: {
        floaty: 'floaty 9s ease-in-out infinite'
      }
    },
  },
  plugins: [],
}


