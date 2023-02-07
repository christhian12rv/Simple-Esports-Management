import { body, param } from 'express-validator';
import playerService from '../../services/Player.service';
import teamService from '../../services/Team.service';

export const create = [
	body('name')
		.notEmpty()
		.withMessage('Name cannot be null')
		.bail()
		.isString()
		.withMessage('Name is invalid'),

	body('age')
		.notEmpty()
		.withMessage('Age cannot be null')
		.bail()
		.isNumeric()
		.withMessage('Age is invalid')
		.bail()
		.isLength({ min: 0, })
		.withMessage('Age is invalid'),

	body('teamId')
		.notEmpty()
		.withMessage('TeamId cannot be null')
		.bail()
		.isNumeric()
		.withMessage('Age is invalid')
		.bail()
		.custom(async (value) => {
			const team = await teamService.findById(value);

			if (!team)
				throw new Error(`There is no team with team id ${value}`);
				
			if (team.players.length >= 5)
				throw new Error(`The maximum number of players in the team with id ${value} has been reached`);

			return true;
		})
];

export const update = [
	param('id')
		.custom(async (value) => {
			const player = await playerService.findById(Number(value));

			if (!player)
				throw new Error(`There is no player with id ${value}`);

			return true;
		}),

	body('name')
		.notEmpty()
		.withMessage('Name cannot be null')
		.bail()
		.isString()
		.withMessage('Name is invalid'),

	body('age')
		.notEmpty()
		.withMessage('Age cannot be null')
		.bail()
		.isNumeric()
		.withMessage('Age is invalid')
		.bail()
		.isLength({ min: 0, })
		.withMessage('Age is invalid'),

	body('teamId')
		.notEmpty()
		.withMessage('TeamId cannot be null')
		.bail()
		.isNumeric()
		.withMessage('Age is invalid')
		.bail()
		.custom(async (value, { req, }) => {
			const team = await teamService.findById(value);

			if (!team)
				throw new Error(`There is no team with team id ${value}`);

			const player = await playerService.findById(Number(req.params.id));

			if (player.teamId != value && team.players.length >= 5)
				throw new Error(`The maximum number of players in the team with id ${value} has been reached`);

			return true;
		})
];

export const _delete = [
	param('id')
		.custom(async (value) => {
			const player = await playerService.findById(Number(value));

			if (!player)
				throw new Error(`There is no player with id ${value}`);

			return true;
		})
];