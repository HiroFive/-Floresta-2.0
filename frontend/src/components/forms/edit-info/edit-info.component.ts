import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseInfo } from 'src/app/common/classes';
import { IInfo } from 'src/app/common/interfaces';
import { phoneNumberRegex } from 'src/app/helpers/constants';
import { InfoService } from 'src/app/services';

@Component({
  selector: 'app-edit-info',
  templateUrl: './edit-info.component.html',
  styleUrls: ['./edit-info.component.scss'],
})
export class EditInfoComponent implements OnInit {
  info: IInfo;
  submitted: boolean = false;
  infoFormGroup!: FormGroup;
  requestErrorMessage!: { massage: string };

  constructor(private InjInfo: BaseInfo, private infoService: InfoService) {
    this.info = this.InjInfo;
    this.infoFormGroup = new FormGroup({
      contacts: new FormControl(this.info.contacts, [
        Validators.required,
        Validators.pattern(phoneNumberRegex),
      ]),
      address: new FormControl(this.info.address, [
        Validators.required,
        Validators.minLength(8),
      ]),
      wifiPassword: new FormControl(this.info.wifiPassword, [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  get address() {
    return this.infoFormGroup.get('address');
  }
  get contacts() {
    return this.infoFormGroup.get('contacts');
  }
  get wifiPassword() {
    return this.infoFormGroup.get('wifiPassword');
  }

  ngOnInit(): void {
    this.infoService.infoErrorMessage.subscribe(
      (message: { massage: string }) => (this.requestErrorMessage = message),
    );
  }

  public submittedFalse(): void {
    this.submitted = false;
  }

  public submit = (): void => {
    this.infoService.setRestaurantInfo(
      this.infoFormGroup.value,
      this.submittedFalse,
    );
  };
}
