/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Theme tokens map to CSS variables (see src/index.css). To switch to a
        // light editorial look later, swap the variables in one place — every
        // component reads through these tokens, so it's a single token swap.
        ink: 'rgb(var(--c-ink) / <alpha-value>)', // page background (cream)
        surface: 'rgb(var(--c-surface) / <alpha-value>)', // raised cards / fields
        ivory: 'rgb(var(--c-ivory) / <alpha-value>)', // primary text (near-black)
        muted: 'rgb(var(--c-muted) / <alpha-value>)', // secondary text
        gold: 'rgb(var(--c-gold) / <alpha-value>)', // tangerine action accent
        teal: 'rgb(var(--c-teal) / <alpha-value>)', // trust / WhatsApp cue
        line: 'rgb(var(--c-line) / <alpha-value>)', // hairline borders
      },
      fontFamily: {
        // Bold, friendly display sans for headings + clean sans for body.
        // (The `serif` slot is repurposed so every `font-serif` heading restyles
        // without touching components.)
        serif: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.28em',
      },
      maxWidth: {
        container: '80rem',
      },
      // Fluid display sizes for big, expressive headlines (mobile → desktop).
      fontSize: {
        'fluid-lg': ['clamp(1.5rem, 4vw, 2.25rem)', { lineHeight: '1.1' }],
        'fluid-xl': ['clamp(2rem, 6vw, 3.5rem)', { lineHeight: '1.04' }],
        'fluid-2xl': ['clamp(2.75rem, 9vw, 5.5rem)', { lineHeight: '0.98' }],
        'fluid-3xl': ['clamp(3.25rem, 12vw, 7.5rem)', { lineHeight: '0.94' }],
      },
      borderRadius: {
        card: '1.5rem',
        bento: '1.75rem',
      },
      // Warm, soft shadows tuned for the bright cream theme.
      boxShadow: {
        soft: '0 18px 40px -24px rgba(31,22,12,0.18)',
        lift: '0 28px 60px -30px rgba(31,22,12,0.24)',
        glow: '0 16px 34px -14px rgba(214,62,8,0.45)',
        'glow-teal': '0 16px 34px -14px rgba(10,122,108,0.4)',
      },
      transitionTimingFunction: {
        // A soft, cinematic ease used across micro-interactions.
        cinema: 'cubic-bezier(0.22, 1, 0.36, 1)',
        // A springier ease for tactile, "snappy" tap feedback.
        snap: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'iris-open': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(0)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        'slow-float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'float-tilt': {
          '0%, 100%': { transform: 'translateY(0) rotate(-1deg)' },
          '50%': { transform: 'translateY(-14px) rotate(1deg)' },
        },
        // Slow cinematic "Ken Burns" zoom/pan for the hero backdrop.
        kenburns: {
          '0%': { transform: 'scale(1) translate3d(0, 0, 0)' },
          '100%': { transform: 'scale(1.14) translate3d(-1.5%, -1.5%, 0)' },
        },
        // Continuous horizontal marquee for the moving brand band.
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) both',
        shimmer: 'shimmer 1.6s infinite',
        'slow-float': 'slow-float 6s ease-in-out infinite',
        'float-tilt': 'float-tilt 7s ease-in-out infinite',
        kenburns: 'kenburns 9s ease-out both',
        marquee: 'marquee 38s linear infinite',
        'spin-slow': 'spin-slow 60s linear infinite',
      },
    },
  },
  plugins: [],
};
