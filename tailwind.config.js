/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'navy-950': '#0A0F1E',
        'navy-900': '#0D1929',
        'navy-800': '#0F172A',
        bg: '#0A0F1E',
        'bg-alt': '#0D1929',
        card: '#0F172A',
        'blue-accent': '#3B82F6',
        'blue-light': '#60A5FA',
        'blue-glow': '#1E3A8A',
        'blue-primary': '#3B82F6',
        'text-main': '#F1F5F9',
        'text-muted': '#94A3B8',
        aws: '#FF9900',
        nvidia: '#76B900',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'blue-glow': '0 0 20px rgba(59, 130, 246, 0.35)',
        'blue-glow-lg': '0 0 40px rgba(59, 130, 246, 0.45)',
        'card-glow': '0 0 0 1px rgba(59, 130, 246, 0.35), 0 0 30px rgba(30, 58, 138, 0.4)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(59, 130, 246, 0.6)' },
        },
        'pulse-glow': {
          '0%, 100%': {
            boxShadow: '0 0 0 0 rgba(59, 130, 246, 0.55), 0 0 12px rgba(59, 130, 246, 0.4)',
            transform: 'scale(1)',
          },
          '50%': {
            boxShadow: '0 0 0 8px rgba(59, 130, 246, 0), 0 0 22px rgba(96, 165, 250, 0.7)',
            transform: 'scale(1.08)',
          },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        glow: 'glow 2.5s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2.2s ease-in-out infinite',
        gradient: 'gradient 4s ease infinite',
      },
      backgroundSize: {
        '300%': '300% 300%',
      },
    },
  },
  plugins: [],
}
