import { Component } from '@angular/core';
import {FireService} from "./services/fire.service";
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dai-quwair';

  constructor(public fire:FireService,public auth:AuthService) {}

  ngOnInit(){
    this.auth.isAuth()
    this.fire.getSystem()
  }
}
