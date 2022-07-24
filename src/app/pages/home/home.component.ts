import { Component, OnInit } from '@angular/core';
import {UserStore} from "../../stores/user.store";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor(private userStore: UserStore) {
  }

  ngOnInit(): void {
  }

}
