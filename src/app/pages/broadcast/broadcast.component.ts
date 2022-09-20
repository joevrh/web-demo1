import { Component, OnInit } from '@angular/core';

declare const Web3: any;
declare const window: any;

@Component({
  selector: 'app-broadcast',
  templateUrl: './broadcast.component.html',
  styleUrls: ['./broadcast.component.scss']
})
export class BroadcastComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  transactions: string;

  web3: any = new Web3(window.web3.currentProvider);

  onBroadcast(){
    if(this.transactions==null){
      return;
    }

    this.transactions = this.transactions.trim();

    let lines: any = [];
    if(this.transactions.indexOf("\r\n")>0){
      lines = this.transactions.split("\r\n");
    }else if(this.transactions.indexOf("\r")>0){
      lines = this.transactions.split("\r");
    }else if(this.transactions.indexOf("\n")>0){
      lines = this.transactions.split("\n");
    }

    console.log(lines);

    for(let line of lines){
      this.web3.eth.sendSignedTransaction(line, function(err: any, hash: any) {
        console.log('Error:', err);
        console.log('Hash:', hash);
      });
    }
    alert("已提交");

  }
}
