import { Injectable } from '@angular/core';
import * as AES from 'crypto-js/aes';
import * as CryptoJS from 'crypto-js';
import {IKey, IReceivedKey} from "../../interfaces/IKey";

@Injectable({
  providedIn: 'root'
})
export class KeyService {

  constructor() { }

  public normalizeKeysForFe(key: IReceivedKey): IKey {
    return { board: key.board, key: key.key, keyUuid: key.key_uuid, tuseeUser: key.tusee_user };
  }
  public generateKey(length = 20): string {
    const keys = {
      upperCase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      lowerCase: 'abcdefghijklmnopqrstuvwxyz',
      number: '0123456789',
      symbol: '!@#$%^&*()_+~`|}{[]:;?><,./-=',
    };
    const getKey = [
      function upperCase() {
        return keys.upperCase[
          Math.floor(Math.random() * keys.upperCase.length)
        ];
      },
      function lowerCase() {
        return keys.lowerCase[
          Math.floor(Math.random() * keys.lowerCase.length)
        ];
      },
      function number() {
        return keys.number[Math.floor(Math.random() * keys.number.length)];
      },
      function symbol() {
        return keys.symbol[Math.floor(Math.random() * keys.symbol.length)];
      },
    ];

    let password = '';
    while (length > password.length) {
      password += getKey[Math.floor(Math.random() * getKey.length)]();
    }

    return password;
  }

  decryptKeys(password: string, keys: IKey[]): IKey[] {
    return keys.map((key) => this.decryptKey(key, password));
  }

  public encryptKey(key: IKey, password: string): IKey {
    return {
      ...key,
      key: AES.encrypt(key.key, password).toString(),
    };
  }

  encryptSingleKey(key: string, password: string): string {
    return AES.encrypt(key, password).toString()
  }

  public decryptKey(key: IKey, password: string): IKey {
    console.log(key, AES.decrypt(key.key, password).toString(CryptoJS.enc.Utf8));
    return {
      ...key,
      key: AES.decrypt(key.key, password).toString(CryptoJS.enc.Utf8),
    };
  }
}
