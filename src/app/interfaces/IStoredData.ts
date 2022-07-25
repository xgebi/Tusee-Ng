import {IKey} from "./IKey";
import * as dayjs from "dayjs";

export interface IStoredData  {
  token: string,
  keys: IKey[],
  automaticLogoutTime: dayjs.Dayjs,
  id?: number
}
