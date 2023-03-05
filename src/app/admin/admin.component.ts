import { Component, OnInit } from '@angular/core';
import {FireService} from "../fire.service";
import {AuthService} from "../auth.service";
import {getDatabase, ref} from "firebase/database";
import {push, set} from "@angular/fire/database";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(public fire:FireService,private auth:AuthService) { }

  isCreatingUser:boolean=false
  isAddingPosition:boolean=false
  isTagEditing:boolean=false
  newUser:any={
    nickname:'',
    email:'',
    password:'',
    name:'',
    surname:'',
    role:'',
    position:''
  }
  newPosition:any={
    positionName:'',
    systemName:''
  }
  newTag:string=''
  message:string=''
  positions:Array<any>=Object.values(this.fire.systemData.positions)
  roles:Array<any>=Object.values(this.fire.systemData.roles)
  isGamesAdding: boolean=false;
  isGamesEditing: boolean=false;

  ngOnInit(): void {

  }

  addPosition(){
    console.log(this.newPosition.systemName)
    //валидация
    let english = /^[A-Za-z0-9]*$/
    if(!english.test(this.newPosition.systemName)){
      this.message='Системное название должно быть на английском языке'
    }
    else{
      this.fire.addPosition(this.newPosition)
    }
  }

  createUser(){
    console.log(this.newUser)
    this.auth.createUser(this.newUser)
  }

  async addTag(tagString: string) {
    const db = getDatabase()
    await push(ref(db, 'system/tags/'), {
      tagName:tagString
    })

    this.fire.getSystem()
  }
}
