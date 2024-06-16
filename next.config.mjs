/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['localhost', 'cdn.pixabay.com', 'images.unsplash.com'],
    },
};

export default nextConfig;
