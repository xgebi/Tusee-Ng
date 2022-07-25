import { Component, OnInit } from '@angular/core';
import {ITask} from "../../../interfaces/ITask";

@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  taskItems: ITask[] = []

  constructor() { }

  ngOnInit(): void {
  }

}
