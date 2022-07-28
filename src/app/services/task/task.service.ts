import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IReceivedTask, ITask} from "../../interfaces/ITask";
import {UserStore} from "../../stores/user.store";
import * as CryptoJS from 'crypto-js';
import * as AES from 'crypto-js/aes';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient, private userStore: UserStore) { }

	fetchTask(id: string) {
		return this.http.get<ITask>(`/api/task/${id}`);
	}

	createTask(task: ITask) {
		return this.http.post('/api/task', task)
	}

	updateTask(task: ITask) {
		return this.http.put(`/api/task/${task.taskUuid}`, task)
	}

	encryptTask(task: ITask): ITask {
    const keys = this.userStore.getKeys()
    let key;
    if (task.board) {
      key = keys.filter((item) => task.board === item.board);
    } else {
      key = keys.filter((item) => !item.board);
    }
		return {
			...task,
			title: AES.encrypt(task.title, key[0].key).toString(),
			description: AES.encrypt(task.description, key[0].key).toString(),
			taskStatus: AES.encrypt(task.taskStatus, key[0].key).toString(),
		};
  }

  decryptTask(task: ITask): ITask {
    const user = useUserStore();
    let key;
    if (task.board) {
      key = user.token.keys.filter((item) => task.board === item.board);
    } else {
      key = user.token.keys.filter((item) => !item.board);
    }
    return {
      ...task,
      title: AES.decrypt(task.title, key[0].key).toString(CryptoJS.enc.Utf8),
      description: AES.decrypt(task.description, key[0].key).toString(
        CryptoJS.enc.Utf8
      ),
      task_status: AES.decrypt(task.task_status, key[0].key).toString(
        CryptoJS.enc.Utf8
      ),
    };
  }

	normalizeTaskForFe(receivedTask: IReceivedTask): ITask {
		return {
			board: "",
			created: undefined,
			creator: "",
			deadline: undefined,
			description: "",
			doneDate: undefined,
			startTime: undefined,
			taskStatus: "",
			taskUuid: "",
			title: "",
			updated: undefined

		}
	}

	normalizeTaskForBe(task: ITask): IReceivedTask {
		return {
			board: "",
			created: undefined,
			creator: "",
			deadline: undefined,
			description: "",
			done_date: undefined,
			start_time: undefined,
			task_status: "",
			task_uuid: "",
			title: "",
			updated: undefined

		}
	}
}
