/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ["cdn.adjipratama.web.id"]
    },
    poweredByHeader: false
};

module.exports = nextConfig;
