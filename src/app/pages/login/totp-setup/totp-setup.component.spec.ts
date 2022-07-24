import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotpSetupComponent } from './totp-setup.component';

describe('TotpSetupComponent', () => {
  let component: TotpSetupComponent;
  let fixture: ComponentFixture<TotpSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotpSetupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotpSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
