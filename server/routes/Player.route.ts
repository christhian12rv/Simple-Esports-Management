import { Router } from 'express';
import playerController from '../controllers/Player.controller';
import * as playerValidator from '../middlewares/validators/Player.validator';

const playerRoute = Router();

playerRoute.get('/', playerController.findAll);
playerRoute.get('/:id', playerController.findById);
playerRoute.get('/name/:name', playerController.findByName);
playerRoute.post('/', playerValidator.create, playerController.create);
playerRoute.put('/:id', playerValidator.update, playerController.update);
playerRoute.delete('/:id', playerValidator._delete, playerController.delete);

export default playerRoute;