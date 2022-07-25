import {Component, Input, OnInit} from '@angular/core';
import {ITask} from "../../../interfaces/ITask";

@Component({
  selector: 'app-task-list-item',
  templateUrl: './task-list-item.component.html',
  styleUrls: ['./task-list-item.component.scss']
})
export class TaskListItemComponent implements OnInit {
  @Input()
  task: ITask | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
