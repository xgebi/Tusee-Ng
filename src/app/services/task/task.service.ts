import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ITask} from "../../interfaces/ITask";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

	fetchTask(id: string) {
		return this.http.get<ITask>(`/api/task/${id}`);
	}

	createTask(task: ITask) {
		return this.http.post('/api/task/', task)
	}

	updateTask(task: ITask) {
		return this.http.put(`/api/task/${task.taskUuid}`, task)
	}
}
