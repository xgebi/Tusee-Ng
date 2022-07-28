import * as dayjs from 'dayjs';

export interface IReceivedTask {
  title: string;
  description: string;
  deadline?: Date | null;
  start_time?: Date | null;
  task_uuid?: string;
  creator?: string;
  board?: string;
  updated?: Date | null;
  created?: Date | null;
  task_status: string;
  done_date: Date | null;
}

export interface ITask {
  title: string;
  description: string;
  deadline?: dayjs.Dayjs | null;
  startTime?: dayjs.Dayjs | null;
  taskUuid?: string;
  creator?: string;
  board?: string;
  updated?: dayjs.Dayjs | null;
  created?: dayjs.Dayjs | null;
  taskStatus: string;
  doneDate: dayjs.Dayjs | null;
}
