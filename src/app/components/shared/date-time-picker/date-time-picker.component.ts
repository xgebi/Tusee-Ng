import {Component, forwardRef, Input, OnInit, Provider} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import * as dayjs from "dayjs";

const DT_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DateTimePickerComponent),
  multi: true,
};

@Component({
  selector: 'app-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.scss'],
	providers: [DT_CONTROL_VALUE_ACCESSOR]
})
export class DateTimePickerComponent implements OnInit, ControlValueAccessor {
	@Input()
	date: dayjs.Dayjs | null | undefined;

	@Input()
	label: string | undefined;

	pickedDateTime: dayjs.Dayjs | null = null;

	onChange = (arg: any) => {};
  onTouched = () => {};
  touched = false;
  disabled = false;
  constructor() { }

  ngOnInit(): void {
		console.log('label');
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
