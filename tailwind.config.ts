/**
 * Tailwind CSS v4 Configuration with YAKO Color Scheme
 */

import type { Config } from 'tailwindcss';

const tailwindConfig: Config = {
  theme: {
    extend: {
      colors: {
        YAKO: {
          light: '#A7D7E5',
          DEFAULT: '#66A8B8',
          dark: '#2B4C54',
        },
      },
    },
  },
  variants: {},
  plugins: [],
};

export default tailwindConfig;