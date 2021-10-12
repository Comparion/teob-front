import { Component, OnInit } from '@angular/core';
import { AccessService } from '../services/access/access.service'; 

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {

  constructor(public _auth: AccessService) { }

  ngOnInit(): void {
  }

}
