import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {FireService} from "../services/fire.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {


  constructor(private auth:AuthService,public fire:FireService) { }

  ngOnInit(): void {
  }


}
