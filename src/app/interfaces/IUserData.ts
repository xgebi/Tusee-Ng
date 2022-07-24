import {IKey, IReceivedKey} from "./IKey";
import {IBoard} from "./IBoard";
import * as dayjs from 'dayjs';


export interface IUserData {
  email: string;
  password: string;
  keys: IKey[];
  firstLogin: boolean;
  usesTotp: boolean;
  automaticLogoutTime: dayjs.Dayjs;
  token: string;
  displayName: string;
  totpSecret: string;
  userUuid: string;
  boards: IBoard[];
  loginSuccessful: boolean;
}

export interface IReceivedUserData {
  email: string;
  password: string;
  keys: IReceivedKey[];
  first_login: boolean;
  uses_totp: boolean;
  automatic_logout_time: dayjs.Dayjs;
  token: string;
  display_name: string;
  totp_secret: string;
  user_uuid: string;
  boards: IBoard[];
  loginSuccessful: boolean;
}
