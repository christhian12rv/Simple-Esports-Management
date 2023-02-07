import { body, param } from 'express-validator';
import teamService from '../../services/Team.service';

export const create = [
	body('name')
		.notEmpty()
		.withMessage('Name cannot be null')
		.bail()
		.isString()
		.withMessage('Name is invalid')
		.custom(async (value) => {
			const team = await teamService.findByName(value);

			if (team)
				throw new Error(`There is already a team with name ${value}`);

			return true;
		})
];

export const update = [
	param('id')
		.custom(async (value) => {
			const team = await teamService.findById(Number(value));

			if (!team)
				throw new Error(`There is no team with id ${value}`);

			return true;
		}),

	body('name')
		.notEmpty()
		.withMessage('Name cannot be null')
		.bail()
		.isString()
		.withMessage('Name is invalid')
];

export const _delete = [
	param('id')
		.custom(async (value) => {
			const team = await teamService.findById(Number(value));

			if (!team)
				throw new Error(`There is no team with id ${value}`);

			return true;
		})
];