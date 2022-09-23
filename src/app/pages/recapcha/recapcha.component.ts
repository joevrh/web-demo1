import { Component, OnInit } from '@angular/core';
import { RecaptchaErrorParameters } from "ng-recaptcha";

@Component({
  selector: 'app-recapcha',
  templateUrl: './recapcha.component.html',
  styleUrls: ['./recapcha.component.scss']
})
export class RecapchaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public resolved(captchaResponse: string): void {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  public onError(errorDetails: RecaptchaErrorParameters): void {
    console.log(`reCAPTCHA error encountered; details:`, errorDetails);
  }

}
