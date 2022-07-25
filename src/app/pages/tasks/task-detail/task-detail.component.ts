import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BehaviorSubject, map, Observable} from "rxjs";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {
  id: BehaviorSubject<string> = new BehaviorSubject<string>("");
  taskFormControl = new FormControl({
    title: new FormControl('', [Validators.required, Validators.minLength(2)]),
    descriptions: new FormControl(''),
    startTime: new FormControl(null),
    deadline: new FormControl(null),
    taskStatus: new FormControl(''),
    board: new FormControl(''),
  })

  constructor(public route: ActivatedRoute) {
    this.id.next("")
    route.params.pipe(
      map(p => p['id'])
    ).subscribe(id => this.id.next(id))
  }

  ngOnInit(): void {
  }

}
