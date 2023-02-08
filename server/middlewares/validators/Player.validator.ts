import { body, param } from 'express-validator';
import playerService from '../../services/Player.service';
import teamService from '../../services/Team.service';

export const create = [
	body('name')
		.notEmpty()
		.withMessage('Nome é obrigatório')
		.bail()
		.isString()
		.withMessage('Nome é inválido'),

	body('age')
		.notEmpty()
		.withMessage('Idade é obrigatória')
		.bail()
		.isNumeric()
		.withMessage('Idade é inválida')
		.bail()
		.isLength({ min: 1, })
		.withMessage('Idade é inválida'),

	body('teamId')
		.notEmpty()
		.withMessage('timeId é obrigatório')
		.bail()
		.isNumeric()
		.withMessage('Idade é inválida')
		.bail()
		.custom(async (value) => {
			const team = await teamService.findById(value);

			if (!team)
				throw new Error(`Não existe um time com id ${value}`);
				
			if (team.players.length >= 5)
				throw new Error(`O número máximo de jogadores no time com id ${value} já foi atingido`);

			return true;
		})
];

export const update = [
	param('id')
		.custom(async (value) => {
			const player = await playerService.findById(Number(value));

			if (!player)
				throw new Error(`Não existe um jogador com id ${value}`);

			return true;
		}),

	body('name')
		.notEmpty()
		.withMessage('Nome é obrigatório')
		.bail()
		.isString()
		.withMessage('Nome é inválido'),

	body('age')
		.notEmpty()
		.withMessage('Idade é obrigatória')
		.bail()
		.isNumeric()
		.withMessage('Idade é inválida')
		.bail()
		.isLength({ min: 1, })
		.withMessage('Idade é inválida'),

	body('teamId')
		.notEmpty()
		.withMessage('timeId é obrigatório')
		.bail()
		.isNumeric()
		.withMessage('Idade é inválida')
		.bail()
		.custom(async (value, { req, }) => {
			const team = await teamService.findById(value);

			if (!team)
				throw new Error(`Não existe um time com id ${value}`);

			const player = await playerService.findById(Number(req.params.id));

			if (player.teamId != value && team.players.length >= 5)
				throw new Error(`O número máximo de jogadores no time com id ${value} já foi atingido`);

			return true;
		})
];

export const _delete = [
	param('id')
		.custom(async (value) => {
			const player = await playerService.findById(Number(value));

			if (!player)
				throw new Error(`Não existe um jogador com id ${value}`);

			return true;
		})
];