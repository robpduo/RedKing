import { ICard } from "./ICard";
import { IUser } from "./IUser";

export interface IDeck {
    id?: number,
    user: IUser,
    card?: ICard[],
    size: number
}