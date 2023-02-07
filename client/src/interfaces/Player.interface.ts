import TeamInterface from './Team.interface';

interface PlayerInterface {
  id: number
  name: string
	age: number
  teamId: number
  team?: TeamInterface
  createdAt?: Date
  updatedAt?: Date
}

export default PlayerInterface;