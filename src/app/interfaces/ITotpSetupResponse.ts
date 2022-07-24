import {IBoard} from "./IBoard";
import {IKey} from "./IKey";

export interface ITotpSetupResponse {
  totpVerified: boolean;
  keys: IKey[];
  boards: IBoard[];
  token: string;
}
