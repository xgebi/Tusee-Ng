import { IKey } from "./IKey";
import {IBoard} from "./IBoard";

export interface IUserData {
  email: string;
  password: string;
  keys: IKey[];
  boards: IBoard[]
}
