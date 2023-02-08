import 'reflect-metadata';
import * as express from 'express';
import * as cors from 'cors';
import logger from './config/logger';
import config from './config/config';
import teamRoute from './routes/Team.route';
import playerRoute from './routes/Player.route';

export default class App {
	private express: express.Application;

	constructor() {
		this.express = express();
		this.listen();
		this.middlewares();
		this.routes();
	}

	public getApp(): express.Application {
		return this.express;
	}

	private middlewares(): void {
		this.express.use(express.json({
			type: '*/*',
		}));
		this.express.use(cors());
	}

	private listen(): void {
		this.express.listen(config.port, () => {
			logger.info(`Server running on: http://localhost:${config.port}`);
		});
	}

	private routes(): void {
		this.express.use('/teams', teamRoute);
		this.express.use('/players', playerRoute);
	}
}