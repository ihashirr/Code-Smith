/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['lh3.googleusercontent.com'], // Add the hostname causing the issue
	  },
};

module.exports = nextConfig;