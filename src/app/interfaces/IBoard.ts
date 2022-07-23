export interface IBoard {
  boardUuid: string;
  name: string;
  description: string;
  owner: string;
  created?: Date;
  columns: string;
}
