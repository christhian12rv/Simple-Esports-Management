import 'dotenv/config';

export default {
	port: Number(process.env.PORT),
	databaseURL: process.env.DATABASE_URL,
};