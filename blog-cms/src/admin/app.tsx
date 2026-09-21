import type { StrapiApp } from '@strapi/strapi/admin';
import AuthLogo from './extensions/sazilo-logo.webp';
import MenuLogo from './extensions/sazilo-logo.webp';
import favicon from './extensions/favicon.ico';

export default {
  config: {
    auth: {
      logo: AuthLogo,
    },
    head: {
      favicon: favicon,
      title: 'Sazilo Store CMS Admin',
    },
    menu: {
      logo: MenuLogo,
    },
    theme: {
      light: {
        colors: {
          primary100: '#ffedd5',
          primary200: '#fed7aa',
          primary500: '#f96612',
          primary600: '#ea580c',
          primary700: '#c2410c',
          danger700: '#b91c1c',
          buttonPrimary500: '#f96612',
          buttonPrimary600: '#ea580c',
        },
      },
    },
    tutorials: false,
    notifications: { releases: false },
  },
  bootstrap(app: StrapiApp) {
    // Strapi admin initialization
  },
};
