import { Component, OnInit } from '@angular/core';
import {AbiService} from "../../service/abi.service";
import BN from 'bn.js';
import {FeeMarketEIP1559Transaction} from "@ethereumjs/tx";

declare const Web3: any;
declare const ethereum: any;
declare const window: any;
declare const AlchemyWeb3: any;

@Component({
  selector: 'app-binance-nft',
  templateUrl: './binance-nft.component.html',
  styleUrls: ['./binance-nft.component.scss']
})
export class BinanceNftComponent implements OnInit {

  constructor(private abiService: AbiService) { }


  //contractAddress: string = "0x3adbdfa13c0b6931257833f4a04e653279e2f4aa";
  contractAddress: string = "0xfcec5833426a26db74c6dca0432b7cdd226781f8";


  //binanceAddress: string = "0x3344dB6026F58C1946792eE0f256C22A33099DD0";
  binanceAddress: string = "0xbeD54DB7b85A2946AE7E556Bb0A4CeC5F8758740";

  privateKey: string | null;

  nftIds: string | null;

  counter: number = 0;

  ngOnInit(): void {

    //let url = "https://eth-mainnet.g.alchemy.com/v2/9igsHeac4KPsVORxit2PdGMdtUKEavHZ";
    let url = "https://eth-goerli.g.alchemy.com/v2/qw86kimJ3-FIWGRLGlDwDplDbX0-2CYB";
    this.web3 = AlchemyWeb3.createAlchemyWeb3(
      url
    );

  }

  //metamaskWeb3: any = new Web3(window.web3.currentProvider);
  web3: any;

  btnSubmitDisable = false;


  async onSubmit(){

    this.counter = 0;

    if(this.privateKey==null){
      alert("privateKey is null");
      return;
    }

    if(this.nftIds==null){
      alert("nftIds is null");
      return;
    }

    this.btnSubmitDisable = true;

    let address = this.web3.eth.accounts.privateKeyToAccount(this.privateKey).address;

    let chainId = await this.web3.eth.getChainId();

    /*if(chainId != 1){
      alert("please switch to ETH mainnet");
      return;
    }*/

    this.nftIds = this.nftIds.trim();

    let lines: any = [];
    if(this.nftIds.indexOf("\r\n")>0){
      lines = this.nftIds.split("\r\n");
    }else if(this.nftIds.indexOf("\r")>0){
      lines = this.nftIds.split("\r");
    }else if(this.nftIds.indexOf("\n")>0) {
      lines = this.nftIds.split("\n");
    }else{
      lines.push(this.nftIds);
    }

    console.log(lines);

    let heroContract = new this.web3.eth.Contract(JSON.parse(this.abiService.heroNftAbi), this.contractAddress);

    let nonce = await this.web3.eth.getTransactionCount(address);

    for(let line of lines){

      let owner: string = await heroContract.methods.ownerOf(line).call();

      if(owner.toLowerCase() != address.toLowerCase()) {
        continue;
      }

      let maxPriorityFeePerGas = await this.web3.eth.getMaxPriorityFeePerGas();
      maxPriorityFeePerGas = (new BN(maxPriorityFeePerGas.substring(2), 16)).toNumber();
      maxPriorityFeePerGas = Math.floor(maxPriorityFeePerGas * 11 / 10);

      let block = await this.web3.eth.getBlock("latest");

      let baseFeePerGas = block.baseFeePerGas;
      baseFeePerGas = Math.floor(baseFeePerGas * 11 / 10);


      let callData = this.web3.eth.abi.encodeFunctionCall(
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "transferFrom",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        [address,this.binanceAddress, parseInt(line)]);

      let rawTx = {
        nonce: nonce,
        maxFeePerGas: baseFeePerGas + maxPriorityFeePerGas,
        maxPriorityFeePerGas: maxPriorityFeePerGas,
        gasLimit: 200000,
        to: this.contractAddress,
        value: '0x0',
        data: callData,
        chainId: chainId,
        type: '0x02'
      }

      let tx = new FeeMarketEIP1559Transaction(rawTx);

      let signedTx = tx.sign(Buffer.from(this.privateKey, 'hex'));

      let raw = '0x' + signedTx.serialize().toString('hex');
      let receipt = await this.web3.eth.sendSignedTransaction(raw);

      console.log(receipt.transactionHash)

      nonce = nonce + 1;
      this.counter ++;
    }

    this.btnSubmitDisable = false;
  }
}
