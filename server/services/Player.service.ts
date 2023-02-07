import prisma from '../config/db';
import PlayerInterface from '../Interfaces/Player.interface';

class PlayerService {
	public async findAll(): Promise<PlayerInterface[]> {
		const players = await prisma.player.findMany({
			include: {
				team: true,
			},
		});
		return players;
	}

	public async findById(id): Promise<PlayerInterface> {
		const player = await prisma.player.findUnique({
			where: {
				id,
			},
			include: {
				team: true,
			},
		});

		return player;
	}

	public async findByName(name): Promise<PlayerInterface> {
		const player = await prisma.player.findFirst({
			where: {
				name,
			},
			include: {
				team: true,
			},
		});

		return player;
	}

	public async create({ name, age, teamId, }): Promise<PlayerInterface> {
		const player = await prisma.player.create({
			data: {
				name,
				age,
				teamId,
			},
			include: {
				team: true,
			},
		});

		return player;
	}

	public async update({ id, name, age, teamId, }): Promise<PlayerInterface> {
		const player = await prisma.player.update({
			where: {
				id,
			},
			data: {
				name,
				age,
				teamId,
			},
			include: {
				team: true,
			},
		});

		return player;
	}

	public async delete(id): Promise<PlayerInterface> {
		const player = await prisma.player.delete({
			where: {
				id,
			},
			include: {
				team: true,
			},
		});

		return player;
	}
}

export default new PlayerService();