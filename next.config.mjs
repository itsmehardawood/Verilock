// ...existing code...
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true, // disables Next.js image optimization and domain checks
        // remotePatterns allows next/image to load from matching external URLs
        remotePatterns: [
            { protocol: 'https', hostname: '**.cdninstagram.com', pathname: '/**' },
            // add more patterns as needed, e.g. other Instagram CDNs:
            { protocol: 'https', hostname: '**.instagramstatic-a.com', pathname: '/**' },
        ],
    },
};

export default nextConfig;
// ...existing code...