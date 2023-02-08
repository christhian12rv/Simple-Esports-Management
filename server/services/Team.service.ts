import { Prisma } from '@prisma/client';
import prisma from '../config/db';
import logger from '../config/logger';
import TeamInterface from '../Interfaces/Team.interface';

class TeamService {
	public async findAll(): Promise<TeamInterface[]> {
		const teams = await prisma.team.findMany({
			include: {
				players: true,
			},
		});
		return teams;
	}

	public async findById(id): Promise<TeamInterface> {
		const team = await prisma.team.findUnique({
			where: {
				id,
			},
			include: {
				players: true,
			},
		});

		return team;
	}

	public async findByName(name): Promise<TeamInterface> {
		const team = await prisma.team.findUnique({
			where: {
				name,
			},
			include: {
				players: true,
			},
		});

		return team;
	}

	public async create({ name, }): Promise<TeamInterface> {
		const team = await prisma.team.create({
			data: {
				name,
			},
			include: {
				players: true,
			},
		});

		return team;
	}

	public async update({ id, name, }): Promise<TeamInterface> {
		const team = await prisma.team.update({
			where: {
				id,
			},
			data: {
				name,
			},
			include: {
				players: true,
			},
		});

		return team;
	}

	public async delete(id): Promise<TeamInterface> {
		const team = await prisma.team.delete({
			where: {
				id,
			},
		});

		return team;
	}
}

export default new TeamService();