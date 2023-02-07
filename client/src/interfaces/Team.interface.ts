import PlayerInterface from './Player.interface';

interface TeamInterface {
  id: number
  name: string
  players?: PlayerInterface[]
  createdAt?: Date
  updatedAt?: Date
}
export default TeamInterface;