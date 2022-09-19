import { Component, OnInit } from '@angular/core';
import {AccessorService} from "../../service/accessor.service";

@Component({
  selector: 'app-subgraph',
  templateUrl: './subgraph.component.html',
  styleUrls: ['./subgraph.component.scss']
})
export class SubgraphComponent implements OnInit {

  constructor(private accessorService: AccessorService) { }

  ngOnInit(): void {
  }

  onClick(){
    const SUBGRAPH_URL = 'https://api.thegraph.com/subgraphs/name/spark-ghub/ido-subgraph' // laster version

    let getAccounts = {
      query: `{
        accounts(where: {address: "0x978981253b3333ec9d34f24d4e1f09e4e26c7b51"}) {
          id
          address
          vrhSummary
          vrhLocked
          purchaseHistory(orderBy: timestamp, orderDirection: desc){
            index
            vrhAmount
            lockedVrhAmount
            ratio
            timestamp
            block
          }
        }
      }`
    };


    console.log(getAccounts);

    this.accessorService.post(SUBGRAPH_URL, getAccounts)
      .subscribe((response)=>{
        console.log(response);
      })

  }

}
