import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import logger from '../config/logger';
import playerService from '../services/Player.service';
import formatErrors from '../utils/formatErrors';

class PlayerController {
	public async findAll(req: Request, res: Response): Promise<Response> {
		logger.info(`Chamando findAll de ${req.originalUrl}`);

		try {
			const players = await playerService.findAll();
			
			const message = 'Jogadores buscados com sucesso';
			logger.info(message);

			return res.status(200).send({ message, players, });
		} catch(e) {
			const message = 'Ocorreram erros internos ao buscar jogadores';
			logger.error(message);

			return res.status(500).send({ message, });
		}
	}

	public async findById(req: Request, res: Response): Promise<Response> {
		logger.info(`Chamando findById de ${req.originalUrl}`);

		const { id, } = req.params;

		try {
			const player = await playerService.findById(Number(id));
			const message = 'Jogador buscado com sucesso';
			logger.info(message);

			return res.status(200).send({ message, player, });
		} catch(e) {
			const message = 'Ocorreram erros internos ao buscar jogador';
			logger.error(e);

			return res.status(500).send({ message, });
		}
	}

	public async findByName(req: Request, res: Response): Promise<Response> {
		logger.info(`Chamando findByName de ${req.originalUrl}`);

		const { name, } = req.params;

		try {
			const player = await playerService.findByName(name);
			
			const message = 'Jogador buscado com sucesso';
			logger.info(message);

			return res.status(200).send({ message, player, });
		} catch(e) {
			const message = 'Ocorreram erros internos ao buscar jogador';
			logger.error(message);

			return res.status(500).send({ message, });
		}
	}

	public async create(req: Request, res: Response): Promise<Response> {
		logger.info(`Chamando create de ${req.originalUrl}`);

		const errors = validationResult(req);
		if (!errors.isEmpty()) 
			return res.status(400).json({ errors: formatErrors(errors.array()), message: 'Ocorreram alguns erros ao criar jogador', });
		
		const data = req.body;

		try {
			const player = await playerService.create(data);
			
			const message = 'Jogador criado com sucesso';
			logger.info(message);

			return res.status(200).send({ message, player, });
		} catch(e) {
			const message = 'Ocorreram erros internos ao criar jogador';
			logger.error(message);

			return res.status(500).send({ message, });
		}
	}

	public async update(req: Request, res: Response): Promise<Response> {
		logger.info(`Chamando update de ${req.originalUrl}`);

		const errors = validationResult(req);
		if (!errors.isEmpty()) 
			return res.status(400).json({ errors: formatErrors(errors.array()), message: 'Ocorreram alguns erros ao atualizar jogador', });
		
		const data = {
			...req.body,
			id: Number(req.params.id),
		};

		try {
			const player = await playerService.update(data);
			
			const message = `Jogador com id ${data.id} atualizado com sucesso`;
			logger.info(message);

			return res.status(200).send({ message, player, });
		} catch(e) {
			const message = 'Ocorreram erros internos ao atualizar jogador';
			logger.error(message);

			return res.status(500).send({ message, });
		}
	}

	public async delete(req: Request, res: Response): Promise<Response> {
		logger.info(`Chamando delete de ${req.originalUrl}`);

		const errors = validationResult(req);
		if (!errors.isEmpty()) 
			return res.status(400).json({ errors: formatErrors(errors.array()), message: 'Ocorreram alguns erros ao deletar jogador', });
		

		const { id, } = req.params;

		try {
			const player = await playerService.delete(Number(id));
			
			const message = `Jogador com id ${id} deletado com sucesso`;
			logger.info(message);

			return res.status(200).send({ message, player, });
		} catch(e) {
			const message = 'Ocorreram erros internos ao deletar jogador';
			logger.error(message);

			return res.status(500).send({ message, });
		}
	}
}

export default new PlayerController();