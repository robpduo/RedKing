import { ICard } from './ICard';
import { IUser } from './IUser';

export interface IDeck {
  deckId?: number;
  user?: IUser;
  card?: ICard[];
  size?: number;
}
