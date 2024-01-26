module.exports = {
	images: {
		domains: ['lh3.googleusercontent.com'],
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
