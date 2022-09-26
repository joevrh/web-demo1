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

  address: string;
  token: string;

  public resolved(captchaResponse: string): void {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
    this.token = captchaResponse;
  }

  public onError(errorDetails: RecaptchaErrorParameters): void {
    console.log(`reCAPTCHA error encountered; details:`, errorDetails);
  }

  onSubmit(): void{
    let faucetRequest:any = {};
    faucetRequest.token = this.token;
    faucetRequest.address = this.address;

    this.accessorService.post(window.serviceUrl + "/vrh-faucet-api/api/v1/public/getTokens", faucetRequest).subscribe((response: any)=>{
      console.log(response);
      if(response.data != true){
        alert(response.msg);
      }
    });
  }

}
