module.exports = {
	apps: [
		{
			name: 'gryadki.api',
			script: 'dist/server.js',
			env: {
				DB_USER: 'asset_adm',
				DB_HOST: '93.93.119.128',
				DB_NAME: 'assetdb',
				DB_PASSWORD: '12345',
				DB_PORT: '5432',
				PORT: '3000',
				JWT_SECRET: 'f1h8ynKWAagV7aHd0T6PxsKUmksHI3DfOef1K5B8Xfj20edvCz',
				TELEGRAM_BOT_TOKEN: '7861382056:AAF5f3VmH4I58OQA-4caJllVH-o0mYj94-A',
			},
		},
	],
};
