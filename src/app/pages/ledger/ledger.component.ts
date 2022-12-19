import { Component, OnInit } from '@angular/core';
import {AbiService} from '../../service/abi.service';
import BN from 'bn.js';
import TransportWebHID from "@ledgerhq/hw-transport-webhid";
import Eth from "@ledgerhq/hw-app-eth";
import { ledgerService } from "@ledgerhq/hw-app-eth"

import { FeeMarketEIP1559Transaction } from '@ethereumjs/tx'
import { Common } from '@ethereumjs/common'

declare const Web3: any;
declare const ethereum: any;
declare const window: any;

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.scss']
})
export class LedgerComponent implements OnInit {

  constructor(private abiService: AbiService) { }


  //usdtAddress: string = '0x111b4e60847bf1642c0b59ff44834bf2447e8597';

  //idoAddress: string = '0xbF967F9C210CF3B09f875046a3d02774b0d10d42';

  usdtAddress: string = '0xdAC17F958D2ee523a2206206994597C13D831ec7';

  idoAddress: string = '0x0992613b2277b6CB2Ea27fB742Aa386466913EB2';

  ngOnInit(): void {
  }

  web3: any = new Web3(window.web3.currentProvider);

  usdtAmount: number;
  gasPrice: number;
  maxPriorityFeePerGas: number;
  needSignHash: string;
  rsv: string;
  rawTx: any;
  addressIndex: number;

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

  async onGetRawTx(){

    TransportWebHID.create().then(transport => {
      let eth = new Eth(transport);

      this.signTxWithResolution(
        eth,
        "44'/60'/"+ this.addressIndex+"'/0/0",
        this.needSignHash
      ).then((result) =>{

        this.rawTx.r = "0x" + result.r;
        this.rawTx.s = "0x" + result.s;
        this.rawTx.v = "0x" + result.v;


        let tx = new FeeMarketEIP1559Transaction(this.rawTx);

        console.log(tx.toJSON());

        this.rawTransaction = "0x"+tx.serialize().toString('hex');

      });

    });

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
