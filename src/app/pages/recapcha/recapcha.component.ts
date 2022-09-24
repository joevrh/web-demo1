import { Component, OnInit } from '@angular/core';
import { RecaptchaErrorParameters } from "ng-recaptcha";
import {AccessorService} from "../../service/accessor.service";

declare const window: any;

@Component({
  selector: 'app-recapcha',
  templateUrl: './recapcha.component.html',
  styleUrls: ['./recapcha.component.scss']
})
export class RecapchaComponent implements OnInit {

  constructor(private accessorService: AccessorService) { }

  ngOnInit(): void {
  }

  public resolved(captchaResponse: string): void {
    console.log(`Resolved captcha with response: ${captchaResponse}`);

    let faucetRequest:any = {};
    faucetRequest.token = captchaResponse;

    this.accessorService.post(window.serviceUrl + "/vrh-faucet-api/api/v1/public/getTokens", faucetRequest).subscribe((response: any)=>{
      console.log(response);
    });

  }

  public onError(errorDetails: RecaptchaErrorParameters): void {
    console.log(`reCAPTCHA error encountered; details:`, errorDetails);
  }

}
