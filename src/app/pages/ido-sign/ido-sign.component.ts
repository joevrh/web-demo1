import { Component, OnInit } from '@angular/core';
import {AbiService} from '../../service/abi.service';
import TransportWebHID from "@ledgerhq/hw-transport-webhid";
import Eth from "@ledgerhq/hw-app-eth";
import { ledgerService } from "@ledgerhq/hw-app-eth"


declare const Web3: any;
declare const ethereum: any;
declare const window: any;



@Component({
  selector: 'app-ido-sign',
  templateUrl: './ido-sign.component.html',
  styleUrls: ['./ido-sign.component.scss']
})
export class IdoSignComponent implements OnInit {

  constructor(private abiService: AbiService) { }


  ngOnInit(): void {
  }



  addressIndex: number;
  unsingedTxt: string;
  singedTxt: string;


  async signTxWithResolution(eth:any, path:any, tx:any) {
    const resolution = await ledgerService
      .resolveTransaction(tx, {}, { externalPlugins: true, erc20: true })
      .catch((e) => {
        console.warn(
          "an error occurred in resolveTransaction => fallback to blind signing: " +
          String(e)
        );
        return null;
      });
    return eth.signTransaction(path, tx, resolution);
  }

  async sign(){

    TransportWebHID.create().then(transport => {
      let eth = new Eth(transport);

      this.signTxWithResolution(
        eth,
        "44'/60'/0'/0/" + this.addressIndex,
        this.unsingedTxt
      ).then((result) =>{
        this.singedTxt = result.r+result.s+result.v;
      });

    });

  }
}
