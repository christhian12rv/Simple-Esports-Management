import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import logger from '../config/logger';
import playerService from '../services/Player.service';
import formatErrors from '../utils/formatErrors';

class PlayerController {
	public async findAll(req: Request, res: Response): Promise<Response> {
		logger.info(`Calling findAll of ${req.originalUrl}`);

		try {
			const players = await playerService.findAll();
			
			const message = 'Players searched successfully';
			logger.info(message);

			return res.status(200).send({ message, players, });
		} catch(e) {
			const message = 'Some internal error occurred while searching players';
			logger.error(message);

			return res.status(500).send({ message, });
		}
	}

	public async findByName(req: Request, res: Response): Promise<Response> {
		logger.info(`Calling findByName of ${req.originalUrl}`);

		const { name, } = req.params;

		try {
			const player = await playerService.findByName(name);
			
			const message = 'Player searched successfully';
			logger.info(message);

			return res.status(200).send({ message, player, });
		} catch(e) {
			const message = 'Some internal error occurred while searching player';
			logger.error(message);

			return res.status(500).send({ message, });
		}
	}

	public async create(req: Request, res: Response): Promise<Response> {
		logger.info(`Calling create of ${req.originalUrl}`);

		const errors = validationResult(req);
		if (!errors.isEmpty()) 
			return res.status(400).json({ errors: formatErrors(errors.array()), message: 'Ocurred some errors while creating player', });
		
		const data = req.body;

		try {
			const player = await playerService.create(data);
			
			const message = 'Player created successfully';
			logger.info(message);

			return res.status(200).send({ message, player, });
		} catch(e) {
			const message = 'Some internal error occurred while creating player';
			logger.error(message);

			return res.status(500).send({ message, });
		}
	}

	public async update(req: Request, res: Response): Promise<Response> {
		logger.info(`Calling update of ${req.originalUrl}`);

		const errors = validationResult(req);
		if (!errors.isEmpty()) 
			return res.status(400).json({ errors: formatErrors(errors.array()), message: 'Ocurred some errors while updating player', });
		
		const data = {
			...req.body,
			id: Number(req.params.id),
		};

		try {
			const player = await playerService.update(data);
			
			const message = `Player with id ${data.id} updated successfully`;
			logger.info(message);

			return res.status(200).send({ message, player, });
		} catch(e) {
			const message = 'Some internal error occurred while updating player';
			logger.error(message);

			return res.status(500).send({ message, });
		}
	}

	public async delete(req: Request, res: Response): Promise<Response> {
		logger.info(`Calling delete of ${req.originalUrl}`);

		const errors = validationResult(req);
		if (!errors.isEmpty()) 
			return res.status(400).json({ errors: formatErrors(errors.array()), message: 'Ocurred some errors while deleting player', });
		

		const { id, } = req.params;

		try {
			const player = await playerService.delete(Number(id));
			
			const message = `Player with id ${id} deleted successfully`;
			logger.info(message);

			return res.status(200).send({ message, player, });
		} catch(e) {
			const message = 'Some internal error occurred while deleting player';
			logger.error(message);

			return res.status(500).send({ message, });
		}
	}
}

export default new PlayerController();