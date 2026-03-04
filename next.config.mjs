const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    // This helps GitHub Pages resolve your assets automatically based on your repo name
    basePath: isProd ? '/Portfolio' : '',
    images: {
        unoptimized: true,
    }
};

export default nextConfig;
