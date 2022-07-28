export interface IReceivedTask {
  title: string;
  description: string;
  deadline?: Date;
  start_time?: Date;
  task_uuid?: string;
  creator?: string;
  board?: string;
  updated?: Date;
  created?: Date;
  task_status: string;
  done_date: Date;
}

export interface ITask {
  title: string;
  description: string;
  deadline?: Date;
  startTime?: Date;
  taskUuid?: string;
  creator?: string;
  board?: string;
  updated?: Date;
  created?: Date;
  taskStatus: string;
  doneDate: Date;
}
