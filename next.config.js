const jiti = require('jiti')(__filename);

// Import env here to validate during build. Using jiti we can import .ts files :)
jiti('./src/env.ts');

const withNextIntl = require('next-intl/plugin')(
  // This is the default (also the `src` folder is supported out of the box)
  './src/i18n.ts',
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
  transpilePackages: ['antd'],
  swcMinify: true,
  redirects: async () => {
    return [
      {
        source: '/admin',
        destination: '/admin/dashboard',
        permanent: false,
      },
    ];
  },
  headers: async () => [
    {
      source: '/:path',
      headers: [
        // This header specifies which "client hints" the server expects from the client browser
        {
          key: 'Accept-CH',
          value:
            'Viewport-Width, Width, Sec-CH-Viewport-Width, Sec-CH-UA-Mobile',
        },
        // This header specifies that it's returns may vary according to these specific client hints
        {
          key: 'Vary',
          value:
            'Viewport-Width, Width, Sec-CH-Viewport-Width, Sec-CH-UA-Mobile',
        },
        // This header specifies which "client hints" the server considers critical from the client browser
        {
          key: 'Critical-CH',
          value:
            'Viewport-Width, Width, Sec-CH-Viewport-Width, Sec-CH-UA-Mobile',
        },
      ],
    },
  ],
  experimental: {
    // Required:
  },
};

module.exports = withNextIntl(nextConfig);
