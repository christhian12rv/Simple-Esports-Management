import { body, param } from 'express-validator';
import teamService from '../../services/Team.service';

export const create = [
	body('name')
		.notEmpty()
		.withMessage('Nome é obrigatório')
		.bail()
		.isString()
		.withMessage('Nome é inválido')
		.bail()
		.isLength({ min: 2, })
		.withMessage('Nome deve conter no mínimo 2 caracteres')
		.bail()
		.custom(async (value) => {
			const team = await teamService.findByName(value);

			if (team)
				throw new Error(`Já existe um time com nome ${value}`);

			return true;
		})
];

export const update = [
	param('id')
		.custom(async (value) => {
			const team = await teamService.findById(Number(value));

			if (!team)
				throw new Error(`Não existe um time com id ${value}`);

			return true;
		}),

	body('name')
		.notEmpty()
		.withMessage('Nome é obrigatório')
		.bail()
		.isString()
		.withMessage('Nome é inválido')
		.bail()
		.custom(async (value) => {
			const team = await teamService.findByName(value);

			if (team)
				throw new Error(`Já existe um time com nome ${value}`);

			return true;
		})
];

export const _delete = [
	param('id')
		.custom(async (value) => {
			const team = await teamService.findById(Number(value));

			if (!team)
				throw new Error(`Não existe um time com id ${value}`);

			return true;
		})
];