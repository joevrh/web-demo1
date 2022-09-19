import { Component, OnInit } from '@angular/core';
import {AbiService} from '../../service/abi.service';
import BN from 'bn.js';


import { FeeMarketEIP1559Transaction } from '@ethereumjs/tx'
import { Common } from '@ethereumjs/common'

declare const Web3: any;
declare const ethereum: any;
declare const window: any;



@Component({
  selector: 'app-ido',
  templateUrl: './ido.component.html',
  styleUrls: ['./ido.component.scss']
})
export class IdoComponent implements OnInit {

  constructor(private abiService: AbiService) { }


  usdtAddress: string = '0x111b4e60847bf1642c0b59ff44834bf2447e8597';

  idoAddress: string = '0x1bf50bddaaed8a2a2888d1ec27eabf06bcaed7aa';

  ngOnInit(): void {
  }

  web3: any = new Web3(window.web3.currentProvider);

  usdtAmount: number;
  gasPrice: number;
  maxPriorityFeePerGas: number;
  needSignHash: string;
  rsv: string;
  rawTx: any;

  async onApprove(){

    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];

    let tokenContract = new this.web3.eth.Contract(JSON.parse(this.abiService.tokenAbi), this.usdtAddress);

    let allowance = await tokenContract.methods.allowance(account, this.idoAddress).call();
    if(allowance=="0"){
      alert('跳转USDT授权!');

      await tokenContract.methods.approve(this.idoAddress, '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff').send({gas: 80000, from: account}, (err:any,  result: any)=>{
        console.log(err);
        console.log(result);
      });

      allowance = await tokenContract.methods.allowance(account, this.idoAddress).call();
    }

    if(allowance == "0"){
      alert('USDT未授权!');
      return;
    }else{
      alert('USDT已授权!');
    }
  }

  async onGetTx(){

    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];

    let nonce = await this.web3.eth.getTransactionCount(account);
    let chainId = await this.web3.eth.getChainId();

    let usdtAmountTemp = Math.trunc(this.usdtAmount * 1000000);
    let amountBN = new BN(usdtAmountTemp);
    let amountHex = '0x'+amountBN.toString(16);



    let gasPriceTemp = Math.trunc(this.gasPrice * 1000);
    let gasPriceBN = new BN(gasPriceTemp);
    gasPriceBN=gasPriceBN.mul(new BN(1000000));
    let gasPriceHex = '0x'+gasPriceBN.toString(16);


    let maxPriorityFeePerGasTemp = Math.trunc(this.maxPriorityFeePerGas * 1000);
    let maxPriorityFeePerGasBN = new BN(maxPriorityFeePerGasTemp);
    maxPriorityFeePerGasBN=maxPriorityFeePerGasBN.mul(new BN(1000000));
    let maxPriorityFeePerGasHex = '0x'+maxPriorityFeePerGasBN.toString(16);


    let callData = this.web3.eth.abi.encodeFunctionCall(
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "yearCount",
            "type": "uint256"
          }
        ],
        "name": "purchase",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
      [amountHex,4]);


    this.rawTx = {
      nonce: nonce,
      maxFeePerGas: gasPriceHex,
      maxPriorityFeePerGas: maxPriorityFeePerGasHex,
      gasLimit: '0xc3500',
      to: this.idoAddress,
      value: '0x0',
      data: callData,
      chainId: chainId,
      type: '0x02'
    }

    let tx = new FeeMarketEIP1559Transaction(this.rawTx);

    let msgHash = tx.getMessageToSign(false);
    let message = msgHash.toString('hex');

    this.needSignHash = message;


  }

  rawTransaction: string;

  async onGetRawTx(){

    let chainId = await this.web3.eth.getChainId();

    const r = "0x" + this.rsv.substring(0, 64);
    const s = "0x" + this.rsv.substring(64, 128);
    const v = "0x" + this.rsv.substring(128, 130);

    this.rawTx.r = r;
    this.rawTx.s = s;
    //this.rawTx.v = this.web3.utils.hexToNumber(v) - 27;
    this.rawTx.v = this.web3.utils.hexToNumber(v);


    let tx = new FeeMarketEIP1559Transaction(this.rawTx);

    console.log(tx.toJSON());

    this.rawTransaction = "0x"+tx.serialize().toString('hex');


    console.log('验证地址:'+this.web3.eth.accounts.recoverTransaction(this.rawTransaction));

  }


  async onBroadcast(){
    if(this.rawTransaction==null){
      alert("rawTransaction is null");
      return;
    }

    this.web3.eth.sendSignedTransaction(this.rawTransaction, function(err: any, hash: any) {
      console.log('Error:', err);
      console.log('Hash:', hash);
      alert(hash);
    });

  }
}
