import { Component, OnInit } from '@angular/core';
import {FireService} from "../services/fire.service";
import {AuthService} from "../services/auth.service";
import {getDatabase, ref} from "firebase/database";
import {push, set} from "@angular/fire/database";
import {RoadmapService} from "../services/roadmap.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(public fire:FireService,private auth:AuthService,public road:RoadmapService) { }

  isCreatingUser:boolean=false
  isAddingPosition:boolean=false
  isTagEditing:boolean=false
  isGamesAdding: boolean=false;
  isGamesEditing: boolean=false;
  isCareerEditing:boolean=false
  isPointAdding:boolean=false;
  isFAQAdding:boolean=false;

  newUser:any={
    nickname:'',
    email:'',
    password:'',
    name:'',
    surname:'',
    role:'',
    position:'',
    avatarPath:''
  }
  newPosition:any={
    positionName:'',
    systemName:''
  }

  newCareer:any={
    section:'',
    name:'',
    shortDescription:'',
    fullDescription:''
  }

  newTag:string=''
  message:string=''
  positions:Array<any>=Object.values(this.fire.systemData.positions)
  roles:Array<any>=Object.values(this.fire.systemData.roles)
  careerSections:Array<any>=Object.values(this.fire.systemData.career)


  ngOnInit(): void {
    this.road.getRoadmap()
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
    this.auth.createUser(this.newUser)
  }

  addPoint(){
    this.isPointAdding=true;
    this.road.selectedPoint={
      id:this.fire.generateId(),
      title:'',
      deadline:'',
      start:'',
      description:'',
      status:'shown',
      tasks:[]
    }
  }

  async addTag(tagString: string) {
    const db = getDatabase()
    await push(ref(db, 'system/tags/'), {
      tagName:tagString
    })
    this.fire.getSystem()
  }

  async addCareer() {
    //валидация
    const db = getDatabase()
    await push(ref(db, 'careers/'+this.newCareer.section.systemName+'/'), {
      section:this.newCareer.section,
      name:this.newCareer.name,
      shortDescription:this.newCareer.shortDescription,
      fullDescription:this.newCareer.fullDescription
    })
    console.log('Добавил вот эту вакансию:',this.newCareer)
  }


}
