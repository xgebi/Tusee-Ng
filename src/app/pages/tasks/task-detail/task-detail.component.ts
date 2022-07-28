import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BehaviorSubject, map, Observable, switchMap} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TaskService} from "../../../services/task/task.service";
import * as dayjs from "dayjs";
import {ITask} from "../../../interfaces/ITask";

@Component({
	selector: 'task-detail',
	templateUrl: './task-detail.component.html',
	styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {
	id: BehaviorSubject<string> = new BehaviorSubject<string>("");
	taskFormGroup = new FormGroup({
		title: new FormControl<string | null>('', [Validators.required, Validators.minLength(2)]),
		description: new FormControl<string | null>(''),
		startTime: new FormControl<dayjs.Dayjs | null>(null),
		deadline: new FormControl<dayjs.Dayjs | null>(null),
		taskStatus: new FormControl<string | null>(''),
		board: new FormControl<string | null>(''),
	})

	constructor(public route: ActivatedRoute, private taskService: TaskService) {
		this.id.next("")
		route.params.pipe(
			map(p => p['id'])
		).subscribe(id => {
			this.id.next(id);
			if (id !== 'new') {
				this.taskService.fetchTask(id)
					.subscribe(task => {
						this.taskFormGroup.setValue({
							title: task.title || '',
							description: task.description || '',
							startTime: task.startTime || null,
							deadline: task.deadline || null,
							taskStatus: task.taskStatus,
							board: task.board || '',
						})
					})
			}
		})
	}

	ngOnInit(): void {
	}

	saveTask($event: MouseEvent) {
		$event.preventDefault();
		console.log(this.taskFormGroup.value);
		this.id
			.pipe(
				switchMap(id => id === 'new' ? this.taskService.createTask(this.taskFormGroup.value as ITask) : this.taskService.updateTask(this.taskFormGroup.value as ITask))
			)
			.subscribe(task => console.log(task));
		// this.id.subscribe(id => {
		// 	if (id === 'new') {
		// 		this.taskService.createTask(this.taskFormGroup.value as ITask)
		// 			.subscribe();
		// 	} else {
		// 		this.taskService.updateTask(this.taskFormGroup.value as ITask)
		// 			.subscribe();
		// 	}
		// })
	}
}
