/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
        // Grab the existing rule that handles SVG imports
        const fileLoaderRule = config.module.rules.find((rule) =>
          rule.test?.test?.('.svg'),
        )
    
        config.module.rules.push(
          {
            ...fileLoaderRule,
            test: /\.svg$/i,
            resourceQuery: /url/, // *.svg?url
          },
          {
            test: /\.svg$/i,
            issuer: fileLoaderRule.issuer,
            resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
            use: ['@svgr/webpack'],
          },
        )
        fileLoaderRule.exclude = /\.svg$/i
    
        return config
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'api.xn--90abjbpy0az.xn--p1ai',
          pathname: '/places/**',
          port: '',
        },
        {
          protocol: 'https',
          hostname: 'api.xn--90abjbpy0az.xn--p1ai',
          pathname: '/user/**',
          port: ''
        },
      ],
    }
};

export default nextConfig;
