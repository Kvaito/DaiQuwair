import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {FireService} from "../services/fire.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private auth:AuthService,private fire:FireService) { }
  isUserAuth:boolean=false
  userName:string=''

  ngOnInit(): void {
    this.checkUser()
  }

  checkUser(){
    if(this.auth.userIsReady){
      if(this.fire.userData.role.role_id !== 0){
        this.isUserAuth=true
        console.log(this.auth.userAuthData)
        this.userName=this.fire.userData.nickname
      }
    }else {
      this.isUserAuth=false;
      this.userName=''
    }
  }

  logout(){
    this.auth.logout()
    this.checkUser()
  }

}
