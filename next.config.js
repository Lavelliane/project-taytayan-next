module.exports = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com',
				pathname: '**',
			},
			{
				protocol: 'https',
				hostname: 'firebasestorage.googleapis.com',
				pathname: '**',
			},
		],
	},
	async headers() {
		return [
			{
				source: '/login',
				headers: [
					{
						key: 'Cross-Origin-Embedder-Policy',
						value: 'unsafe-none',
					},
				],
			},
		];
	},
};
