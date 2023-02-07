import { Router } from 'express';
import teamController from '../controllers/Team.controller';
import * as teamValidator from '../middlewares/validators/Team.validator';

const teamRoute = Router();

teamRoute.get('/', teamController.findAll);
teamRoute.get('/:name', teamController.findByName);
teamRoute.post('/', teamValidator.create, teamController.create);
teamRoute.put('/:id', teamValidator.update, teamController.update);
teamRoute.delete('/:id', teamValidator._delete, teamController.delete);

export default teamRoute;