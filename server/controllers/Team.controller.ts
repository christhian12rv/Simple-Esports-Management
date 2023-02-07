import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import logger from '../config/logger';
import teamService from '../services/Team.service';
import formatErrors from '../utils/formatErrors';

class TeamController {
	public async findAll(req: Request, res: Response): Promise<Response> {
		logger.info(`Calling findAll of ${req.originalUrl}`);

		try {
			const teams = await teamService.findAll();
			
			const message = 'Teams searched successfully';
			logger.info(message);

			return res.status(200).send({ message, teams, });
		} catch(e) {
			const message = 'Some internal error occurred while searching teams';
			logger.error(message);

			return res.status(500).send({ message, });
		}
	}

	public async findByName(req: Request, res: Response): Promise<Response> {
		logger.info(`Calling findByName of ${req.originalUrl}`);

		const { name, } = req.params;

		try {
			const team = await teamService.findByName(name);
			
			const message = 'Team searched successfully';
			logger.info(message);

			return res.status(200).send({ message, team, });
		} catch(e) {
			const message = 'Some internal error occurred while searching team';
			logger.error(message);

			return res.status(500).send({ message, });
		}
	}

	public async create(req: Request, res: Response): Promise<Response> {
		logger.info(`Calling create of ${req.originalUrl}`);

		const errors = validationResult(req);
		if (!errors.isEmpty()) 
			return res.status(400).json({ errors: formatErrors(errors.array()), message: 'Ocurred some errors while creating team', });
		
		const data = req.body;

		try {
			const team = await teamService.create(data);
			
			const message = 'Team created successfully';
			logger.info(message);

			return res.status(200).send({ message, team, });
		} catch(e) {
			const message = 'Some internal error occurred while creating team';
			logger.error(message);

			return res.status(500).send({ message, });
		}
	}

	public async update(req: Request, res: Response): Promise<Response> {
		logger.info(`Calling update of ${req.originalUrl}`);

		const errors = validationResult(req);
		if (!errors.isEmpty()) 
			return res.status(400).json({ errors: formatErrors(errors.array()), message: 'Ocurred some errors while updating team', });
		
		const data = {
			...req.body,
			id: Number(req.params.id),
		};

		try {
			const team = await teamService.update(data);
			
			const message = `Team with id ${data.id} updated successfully`;
			logger.info(message);

			return res.status(200).send({ message, team, });
		} catch(e) {
			const message = 'Some internal error occurred while updating team';
			logger.error(message);

			return res.status(500).send({ message, });
		}
	}

	public async delete(req: Request, res: Response): Promise<Response> {
		logger.info(`Calling delete of ${req.originalUrl}`);

		const errors = validationResult(req);
		if (!errors.isEmpty()) 
			return res.status(400).json({ errors: formatErrors(errors.array()), message: 'Ocurred some errors while deleting team', });
		

		const { id, } = req.params;

		try {
			const team = await teamService.delete(Number(id));
			
			const message = `Team with id ${id} deleted successfully`;
			logger.info(message);

			return res.status(200).send({ message, team, });
		} catch(e) {
			const message = 'Some internal error occurred while deleting team';
			logger.error(message);

			return res.status(500).send({ message, });
		}
	}
}

export default new TeamController();