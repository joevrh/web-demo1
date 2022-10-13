import { Component, OnInit } from '@angular/core';
import {AbiService} from "../../service/abi.service";
import BN from 'bn.js';

declare const Web3: any;
declare const window: any;
declare const ethereum: any;

@Component({
  selector: 'app-airdropper',
  templateUrl: './airdropper.component.html',
  styleUrls: ['./airdropper.component.scss']
})
export class AirdropperComponent implements OnInit {

  constructor(public abiService: AbiService) { }

  addressList: string | null;
  amountList: string | null;

  addresses: Array<string> | null;
  amounts: Array<number> | null;

  addressCount  = 0;
  amountCount = 0;
  amountTotal = 0;

  web3: any = new Web3(window.web3.currentProvider);

  ngOnInit(): void {
  }

  onClear(){
    this.addressList = null;
    this.amountList = null;

    this.addresses = null;
    this.amounts = null;

    this.addressCount  = 0;
    this.amountCount = 0;
    this.amountTotal = 0;
  }

  onCheck(){

    if(this.addressList==null || this.amountList==null){
      this.addresses = null;
      this.amounts = null;

      this.addressCount  = 0;
      this.amountCount = 0;
      this.amountTotal = 0;
      return;
    }

    this.addressList = this.addressList.trim();
    this.amountList = this.amountList.trim();

    if(this.addressList.length==0 || this.amountList.length==0){
      this.addresses = null;
      this.amounts = null;

      this.addressCount  = 0;
      this.amountCount = 0;
      this.amountTotal = 0;
      return;
    }

    this.addresses = [];
    if(this.addressList.indexOf("\r\n")>0){
      this.addresses = this.addressList.split("\r\n");
    }else if(this.addressList.indexOf("\r")>0){
      this.addresses = this.addressList.split("\r");
    }else if(this.addressList.indexOf("\n")>0) {
      this.addresses = this.addressList.split("\n");
    }else{
      this.addresses.push(this.addressList);
    }

    console.log(this.addresses);


    let lines: any = [];
    if(this.amountList.indexOf("\r\n")>0){
      lines = this.amountList.split("\r\n");
    }else if(this.amountList.indexOf("\r")>0){
      lines = this.amountList.split("\r");
    }else if(this.amountList.indexOf("\n")>0) {
      lines = this.amountList.split("\n");
    }else{
      lines.push(this.amountList);
    }

    this.amounts = [];

    for(let item of lines){
      this.amounts.push(parseInt(item));
    }

    console.log(this.amounts);


    this.addressCount = this.addresses.length;
    this.amountCount = this.amounts.length;

    let amount = 0;
    for(let item of this.amounts){
      amount = amount + item;
    }
    this.amountTotal = amount;
  }

  async onSubmit(){

    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];

    let contractAddress = "0x18fC18b673Fea56D8D698a858bFB364BA9CDa6c2";
    let tokenAddress = "0xa59e341e8047498700eD244814b01b34547fb21B";
    let tokenContract = new this.web3.eth.Contract(JSON.parse(this.abiService.airdropper), contractAddress);

    if(this.addresses==null || this.addresses?.length==0){
      alert("Please do check first!");
      return;
    }

    if(this.amounts==null || this.amounts?.length==0){
      alert("Please do check first!");
      return;
    }

    if(this.addresses.length != this.amounts.length){
      alert("Length not match, please do check first!");
      return;
    }


    let amounts = [];
    let baseBN = new BN(10).pow(new BN(18));
    // @ts-ignore
    for(let item of this.amounts){
      let amountBN = new BN(item);
      amountBN=amountBN.mul(baseBN);
      let amountHex = '0x'+amountBN.toString(16);
      amounts.push(amountHex);
    }

    await tokenContract.methods.doAirDrop2(tokenAddress, this.addresses, amounts).send({from: account}, (err:any,  result: any)=>{
      console.log(err);
      console.log(result);
    });

  }
}
