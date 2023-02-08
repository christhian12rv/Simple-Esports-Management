import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import logger from '../config/logger';
import teamService from '../services/Team.service';
import formatErrors from '../utils/formatErrors';

class TeamController {
	public async findAll(req: Request, res: Response): Promise<Response> {
		logger.info(`Chamando findAll de ${req.originalUrl}`);

		try {
			const teams = await teamService.findAll();
			
			const message = 'Times buscados com sucesso';
			logger.info(message);

			return res.status(200).send({ message, teams, });
		} catch(e) {
			const message = 'Ocorreram erros internos ao buscar times';
			logger.error(message);

			return res.status(500).send({ message, });
		}
	}

	public async findById(req: Request, res: Response): Promise<Response> {
		logger.info(`Chamando findById de ${req.originalUrl}`);

		const { id, } = req.params;

		try {
			const team = await teamService.findById(Number(id));
			
			const message = 'Time buscado com sucesso';
			logger.info(message);

			return res.status(200).send({ message, team, });
		} catch(e) {
			const message = 'Ocorreram erros internos ao buscar time';
			logger.error(message);

			return res.status(500).send({ message, });
		}
	}

	public async findByName(req: Request, res: Response): Promise<Response> {
		logger.info(`Chamando findByName de ${req.originalUrl}`);

		const { name, } = req.params;

		try {
			const team = await teamService.findByName(name);
			
			const message = 'Time buscado com sucesso';
			logger.info(message);

			return res.status(200).send({ message, team, });
		} catch(e) {
			const message = 'Ocorreram erros internos ao buscar time';
			logger.error(message);

			return res.status(500).send({ message, });
		}
	}

	public async create(req: Request, res: Response): Promise<Response> {
		logger.info(`Chamando create de ${req.originalUrl}`);

		logger.info('body',req.body);

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			const message = 'Ocorreram alguns erros ao criar time';
			logger.error(message);
			return res.status(400).json({ errors: formatErrors(errors.array()), message, });
		}
		const data = req.body;

		try {
			const team = await teamService.create(data);
			
			const message = 'Time criado com sucesso';
			logger.info(message);

			return res.status(200).send({ message, team, });
		} catch(e) {
			const message = 'Ocorreram alguns erros internos ao criar time';
			logger.error(message);

			return res.status(500).send({ message, });
		}
	}

	public async update(req: Request, res: Response): Promise<Response> {
		logger.info(`Chamando update de ${req.originalUrl}`);

		const errors = validationResult(req);
		if (!errors.isEmpty()) 
			return res.status(400).json({ errors: formatErrors(errors.array()), message: 'Ocorreram alguns erros ao atualizar time', });
		
		const data = {
			...req.body,
			id: Number(req.params.id),
		};

		logger.info(data);

		try {
			const team = await teamService.update(data);
			
			const message = `Time com id ${data.id} atualizado com sucesso`;
			logger.info(message);

			return res.status(200).send({ message, team, });
		} catch(e) {
			const message = 'Ocorreram alguns erros internos ao atualizar time';
			logger.error(message);

			return res.status(500).send({ message, });
		}
	}

	public async delete(req: Request, res: Response): Promise<Response> {
		logger.info(`Chamando delete de ${req.originalUrl}`);

		const errors = validationResult(req);
		if (!errors.isEmpty()) 
			return res.status(400).json({ errors: formatErrors(errors.array()), message: 'Ocorreram alguns erros ao deletar time', });
		

		const { id, } = req.params;

		try {
			const team = await teamService.delete(Number(id));
			
			const message = `Time com id ${id} deletado com sucesso`;
			logger.info(message);

			return res.status(200).send({ message, team, });
		} catch(e) {
			const message = 'Ocorreram alguns erros internos ao deletar time';
			logger.error(e);

			return res.status(500).send({ message, });
		}
	}
}

export default new TeamController();