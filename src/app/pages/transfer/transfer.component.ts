import { Component, OnInit } from '@angular/core';
import {AbiService} from "../../service/abi.service";
import BN from "bn.js";

declare const Web3: any;
declare const window: any;
declare const ethereum: any;

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {

  constructor(public abiService: AbiService) { }

  addressList: string | null;
  amountList: string | null;

  addresses: Array<string> | null;
  amounts: Array<number> | null;

  addressCount  = 0;
  amountCount = 0;
  amountTotal = 0;

  web3: any = new Web3(window.web3.currentProvider);

  contractAddress: string;
  tokenAddress: string;
  ngOnInit(): void {
    this.contractAddress = "0x52d351fdd1cfb8c0e127e6219db62815307bb209";
    this.tokenAddress = "0xa59e341e8047498700eD244814b01b34547fb21B";

    //this.contractAddress = "0x5fd2b4c79cda423fcf088ab7a69aeb835de99cdc";
    //this.tokenAddress = "0xf0e28ac66971422ffa041930ba4668b8fcce8062";

    //this.contractAddress = "0xC1C778db27ED9dBEBA5c4B3CB984777e62f9F45b";
    //this.tokenAddress = "0x10535d0e2fcd6bfff4347429e0720c730c5cb408";
  }

  async onApprove(){

    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];

    let tokenContract = new this.web3.eth.Contract(JSON.parse(this.abiService.tokenAbi), this.tokenAddress);

    let allowance = await tokenContract.methods.allowance(account, this.contractAddress).call();
    if(allowance=="0"){
      alert('跳转MOH授权!');

      await tokenContract.methods.approve(this.contractAddress, '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff').send({gas: 80000, from: account}, (err:any,  result: any)=>{
        console.log(err);
        console.log(result);
      });

      allowance = await tokenContract.methods.allowance(account, this.contractAddress).call();
    }

    if(allowance == "0"){
      alert('MOH未授权!');
      return;
    }else{
      alert('MOH已授权!');
    }
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
      this.amounts.push(parseFloat(item));
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


    let tokenContract = new this.web3.eth.Contract(JSON.parse(this.abiService.transferAbi), this.contractAddress);

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
    let baseBN = new BN(10).pow(new BN(16));
    // @ts-ignore
    for(let item of this.amounts){
      let amountBN = new BN(item * 100);
      amountBN=amountBN.mul(baseBN);
      let amountHex = '0x'+amountBN.toString(16);
      amounts.push(amountHex);
    }

    await tokenContract.methods.transfer(this.tokenAddress, this.addresses, amounts).send({from: account}, (err:any,  result: any)=>{
      console.log(err);
      console.log(result);
    });

  }

}
