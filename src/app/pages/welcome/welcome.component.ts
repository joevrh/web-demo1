import { Component, OnInit } from '@angular/core';
import {AbiService} from '../../service/abi.service';
import BN from 'bn.js';
import {AccessorService} from "../../service/accessor.service";
import {HttpHeaders} from "@angular/common/http";

declare const Web3: any;
declare const ethereum: any;
declare const window: any;

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(private abiService: AbiService, private accessorService: AccessorService) { }

  tokenContract: any;

  async ngOnInit() {



  }



  web3: any = new Web3(window.web3.currentProvider);

  /*address: string;
  balance: number;

  async onBalance(){
    //const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    //const account = accounts[0];

    this.tokenContract = new this.web3.eth.Contract(JSON.parse(this.abiService.tokenAbi), this.abiService.tokenAddress);

    let balanceTemp = await this.tokenContract.methods.balanceOf(this.address).call();

    let balanceBn = new BN(balanceTemp);

    this.balance = balanceBn.div(new BN("1000000000000000000")).toNumber();

  }



  toAddress: string;
  amount: number;

  async onTransfer(){

    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];

    this.tokenContract = new this.web3.eth.Contract(JSON.parse(this.abiService.tokenAbi), this.abiService.tokenAddress);

    if(this.amount==null || this.amount<=0 || this.toAddress==null){
      return;
    }


    let amountTemp = Math.trunc(this.amount * 10000);

    let amountBN = new BN(amountTemp);
    amountBN=amountBN.mul(new BN(100000000000000));


    let amountHex = '0x'+amountBN.toString(16);
    await this.tokenContract.methods.transfer(this.toAddress, amountHex).send({gas: 200000,  from: account}, (err:any,  result: any)=>{
      console.log(err);
      console.log(result);
    });

  }*/

  email: string;
  nonce: string;

  async register(nonce: string){

    if (typeof ethereum === 'undefined') {
      return;
    }

    console.log('MetaMask is installed!');

    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];


    console.log(account);
    console.log(ethereum.networkVersion)

    let signature = await this.web3.eth.personal.sign(nonce, account, (err: any,res: any) => console.log(err,res));

    let signature1 = signature.substring(2);

    const r = "0x" + signature1.substring(0, 64);
    const s = "0x" + signature1.substring(64, 128);
    const v = "0x" + signature1.substring(128, 130);


    let loginRequest:any = {};
    loginRequest.address = account;
    loginRequest.nonce = nonce;
    loginRequest.email = this.email;

    loginRequest.r = r;
    loginRequest.s = s;
    loginRequest.v = v;


    //let address = await web3.eth.personal.ecRecover(msg, signature);
    //console.log(address);

    this.accessorService.post(window.serviceUrl + "/vrh-sys-api/api/v1/auth/register", loginRequest).subscribe((response: any)=>{
      console.log(response);
    });

    console.log("finished");

  }

  async onRegister(){

    this.accessorService.get(window.serviceUrl +  "/vrh-sys-api/api/v1/public/getNonce")
      .subscribe((response: any)=>{
        console.log(response.data);
        this.register(response.data);
      })
  }



  async bind(nonce: string){

    if (typeof ethereum === 'undefined') {
      return;
    }

    console.log('MetaMask is installed!');

    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];


    console.log(account);
    console.log(ethereum.networkVersion)

    let signature = await this.web3.eth.personal.sign(nonce, account, (err: any,res: any) => console.log(err,res));

    let signature1 = signature.substring(2);

    const r = "0x" + signature1.substring(0, 64);
    const s = "0x" + signature1.substring(64, 128);
    const v = "0x" + signature1.substring(128, 130);


    let loginRequest:any = {};
    loginRequest.address = account;
    loginRequest.nonce = nonce;
    loginRequest.email = "xiaocan06@gmail.com";

    loginRequest.r = r;
    loginRequest.s = s;
    loginRequest.v = v;


    //let address = await web3.eth.personal.ecRecover(msg, signature);
    //console.log(address);

    this.accessorService.post(window.serviceUrl + "/vrh-sys-api/api/v1/auth/bindEmail", loginRequest).subscribe((response: any)=>{
      console.log(response);
    });

    console.log("finished");

  }

  async onBind(){

    this.accessorService.get(window.serviceUrl +  "/vrh-sys-api/api/v1/public/getNonce")
      .subscribe((response: any)=>{
        console.log(response.data);
        this.bind(response.data);
      })
  }

  async onRegisterVerify(){
    if (typeof ethereum === 'undefined') {
      return;
    }

    console.log('MetaMask is installed!');

    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];


    console.log(account);
    console.log(ethereum.networkVersion)

    let bindEmailRequest:any = {};
    bindEmailRequest.address = account;
    bindEmailRequest.nonce = this.nonce;

    this.accessorService.post(window.serviceUrl +  "/vrh-sys-api/api/v1/auth/verifyRegister", bindEmailRequest)
      .subscribe((response: any)=>{
        console.log(response.data);
      })
  }


  async login(nonce: string){

    if (typeof ethereum === 'undefined') {
      return;
    }

    console.log('MetaMask is installed!');

    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];


    console.log(account);
    console.log(ethereum.networkVersion)

    let signature = await this.web3.eth.personal.sign(nonce, account, (err: any,res: any) => console.log(err,res));

    let signature1 = signature.substring(2);

    const r = "0x" + signature1.substring(0, 64);
    const s = "0x" + signature1.substring(64, 128);
    const v = "0x" + signature1.substring(128, 130);


    let loginRequest:any = {};
    loginRequest.address = account;
    loginRequest.nonce = nonce;

    loginRequest.r = r;
    loginRequest.s = s;
    loginRequest.v = v;

    //loginRequest.inviterCode =  'b9d645010801000';


    //let address = await web3.eth.personal.ecRecover(msg, signature);
    //console.log(address);

    //this.accessorService.post(window.serviceUrl + "/vrh-sys-api/api/v1/auth/login", loginRequest).subscribe((response: any)=>{
    this.accessorService.post(window.serviceUrl + "/finance-sys-api/api/v1/auth/login", loginRequest).subscribe((response: any)=>{
      console.log(response);
    });

    console.log("finished");

  }

  scale2Format = (value: any = 0) => {

    var num = new BN(value * 100); //整形会直接取成整数的
    return num.toNumber() / 100;

  };

  async onLogin(){

    //console.log(this.scale2Format(2711.105192));

    this.accessorService.get(window.serviceUrl +  "/finance-sys-api/api/v1/public/getNonce")
      .subscribe((response: any)=>{
        console.log(response.data);
        this.login(response.data);
      });


  }


  async onListing(){
    let heroAddress = "0xda01418d061c37b8c588f733acaf2e6c7e91f1f3";
    let tradeAddress = "0x5d4761a54cd39c85bd29fbbb2014b36b83879c3f";

    let request: any = {};
    request.nftTokenId = 6;
    request.paymentToken = "0xda1be7d231ad1e947d5fa1c30f87f7e94c981d6e";
    request.price = "100000000";
    request.fee = "3000000";
    request.sellerAddress = "0x978981253B3333Ec9d34f24D4E1F09E4E26c7b51";
    request.listingTime = 1659664250;
    request.expirationTime = 1660095518;

    let abiEncoded = this.web3.eth.abi.encodeParameters(
      [
        'address',
        'address',
        'uint256',
        'address',
        'uint256',
        'uint256',
        'address',
        'uint256',
        'uint256'
      ],
      [
        tradeAddress,
        heroAddress,
        request.nftTokenId,
        request.paymentToken,
        request.price,
        request.fee,
        request.sellerAddress,
        request.listingTime,
        request.expirationTime
      ]

    );

    console.log(abiEncoded);

    let hash = this.web3.utils.keccak256(abiEncoded);
    console.log(hash);

    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    let signature = await this.web3.eth.personal.sign(hash, account, (err: any,res: any) => console.log(err,res));

    request.rsv = signature;

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJ1c2VySWRcIjo3NDY3NTk4MDkzNjUxODQ1MTJ9IiwiZXhwIjoxNjU5NjkyMTIwfQ.I6CvmwxKvFEwWLlanj59-ZIVTiZbGdpVnqkbVZI8Izc',
      'userId': "746759809365184512" });
    let options = { headers: headers };

    this.accessorService.postWithHeader(window.serviceUrl +  "/vrh-sys-api/api/v1/marketplace/createHeroSellOrder", request, options)
      .subscribe((response: any)=>{
        console.log(response.data);
      })


    //request.rsv

    //check nft approval
  }



  async onListWeapon(){
    let weaponAddress = "0x656bc0a45b45f8724bf4d936393e7f2c7dcd8a82";
    let tradeAddress = "0x5d4761a54cd39c85bd29fbbb2014b36b83879c3f";

    let request: any = {};
    request.nftTokenId = 6;
    request.paymentToken = "0xda1be7d231ad1e947d5fa1c30f87f7e94c981d6e";
    request.price = "100000000";
    request.fee = "3000000";
    request.sellerAddress = "0x978981253B3333Ec9d34f24D4E1F09E4E26c7b51";
    request.listingTime = 1659668851;
    request.expirationTime = 1660095518;

    let abiEncoded = this.web3.eth.abi.encodeParameters(
      [
        'address',
        'address',
        'uint256',
        'address',
        'uint256',
        'uint256',
        'address',
        'uint256',
        'uint256'
      ],
      [
        tradeAddress,
        weaponAddress,
        request.nftTokenId,
        request.paymentToken,
        request.price,
        request.fee,
        request.sellerAddress,
        request.listingTime,
        request.expirationTime
      ]

    );

    console.log(abiEncoded);

    let hash = this.web3.utils.keccak256(abiEncoded);
    console.log(hash);

    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    let signature = await this.web3.eth.personal.sign(hash, account, (err: any,res: any) => console.log(err,res));

    request.rsv = signature;

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJ1c2VySWRcIjo3NDY3NTk4MDkzNjUxODQ1MTJ9IiwiZXhwIjoxNjU5NjkyMTIwfQ.I6CvmwxKvFEwWLlanj59-ZIVTiZbGdpVnqkbVZI8Izc',
      'userId': "746759809365184512" });
    let options = { headers: headers };

    this.accessorService.postWithHeader(window.serviceUrl +  "/vrh-sys-api/api/v1/marketplace/createWeaponSellOrder", request, options)
      .subscribe((response: any)=>{
        console.log(response.data);
      })


    //request.rsv

    //check nft approval
  }
}
