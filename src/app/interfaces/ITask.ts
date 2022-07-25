export interface ITask {
  title: string;
  description: string;
  deadline?: Date;
  startTime?: Date;
  task_uuid?: string;
  creator?: string;
  board?: string;
  updated?: Date;
  created?: Date;
  task_status: string;
  done_date: Date;
}
