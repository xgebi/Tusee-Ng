import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UserStore} from "../../../stores/user.store";
import {IUserData} from "../../../interfaces/IUserData";
import {UserService} from "../../../services/user/user.service";

@Component({
  selector: 'app-totp-setup',
  templateUrl: './totp-setup.component.html',
  styleUrls: ['./totp-setup.component.scss'],
})
export class TotpSetupComponent implements OnInit {
  user: IUserData | null = null;
  qrCodeData = "";
  confirmCode: string = "";

  constructor(private userStore: UserStore) {
    userStore.user$.subscribe(ud => {
      this.user = ud;
      if (ud) {
        this.qrCodeData = `otpauth://totp/${window.location.hostname}?secret=${ud?.totpSecret}&issuer=tusee&digits=1`
      }
    })
  }

  confirmTotp(e: Event) {
    e.preventDefault();
  }

  skip(e: Event) {
    e.preventDefault();
    this.userStore.setupTotp({
      skip: true,
      totpCode: '',
    })
  }

  ngOnInit(): void {
  }

}
