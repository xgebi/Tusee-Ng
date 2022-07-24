import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IBoard} from "../../interfaces/IBoard";
import {IKey} from "../../interfaces/IKey";
import * as AES from 'crypto-js/aes';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private http: HttpClient) { }

  decryptBoards(keys: IKey[], boards: IBoard[]) {
    return boards.map((board) => this.decryptBoard(board, keys));
  }

  decryptBoard(
    board: IBoard,
    keys: IKey[]
  ): IBoard {
    const key: IKey | undefined = keys.find((item) => board.boardUuid === item.board);
    if (key) {
      return {
        ...board,
        name: AES.decrypt(board.name, key.key).toString(CryptoJS.enc.Utf8),
        description: AES.decrypt(board.description, key.key).toString(
          CryptoJS.enc.Utf8
        ),
        columns: AES.decrypt(board.columns, key.key).toString(
          CryptoJS.enc.Utf8
        ),
      };
    }
    throw new Error('Key was not found');
  }
}
