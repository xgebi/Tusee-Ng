import {Component, Input, OnInit} from '@angular/core';
import {ControlValueAccessor} from "@angular/forms";
import * as dayjs from "dayjs";

@Component({
  selector: 'app-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.scss']
})
export class DateTimePickerComponent implements OnInit, ControlValueAccessor {
	@Input()
	date: dayjs.Dayjs | null = null;

	pickedDateTime: dayjs.Dayjs | null = null;

	onChange = (arg: any) => {};
  onTouched = () => {};
  touched = false;
  disabled = false;
  constructor() { }

  ngOnInit(): void {
  }

	registerOnChange(onChange: any): void {
		this.onChange = onChange
	}

	registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

	markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

	writeValue(dt: dayjs.Dayjs): void {
		this.pickedDateTime = dt;
	}

}
