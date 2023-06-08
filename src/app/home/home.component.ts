import { Component, OnInit } from '@angular/core';
import {FireService} from "../services/fire.service";
import {RoadmapService} from "../services/roadmap.service";
import {getDownloadURL} from "firebase/storage";
import {getStorage, ref as storageRef} from "@angular/fire/storage";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private fire:FireService,private road:RoadmapService) { }
  hotNews:Array<any>=[]
  team=[
    {name:'',
    surname:'',
    nickname:'',
    position:{
      name:''
    },
    avatarPath:'',
      avatarUrl:''
    }
  ]
  roadmap=[]
  newsReady:boolean=false
  teamReady:boolean=false
  roadmapReady:boolean=false

  ngOnInit(): void {
    this.getNews()
    this.getTeam()
  }

  async getNews(){
    await this.fire.getNotes()
    this.hotNews=Object.values(this.fire.notes)
    for(let i=0;i<this.hotNews.length;i++){
      this.hotNews[i]=Object.values(this.hotNews[i])
    }
    this.hotNews = this.hotNews.concat.apply([],this.hotNews);
    this.hotNews=this.hotNews.filter((note)=>{
      return note.status=='important'
    })
    if(this.hotNews!=undefined){
      for(let note of this.hotNews){
        if(note.cover_path!=''){
          note.coverUrl=await getDownloadURL(storageRef(getStorage(), note.cover_path))
        }
      }
      this.newsReady=true
    }
  }

  async getTeam() {
    await this.fire.getTeam().then(async () => {
      this.team = Object.values(this.fire.team)
      for (let i = 0; i < this.team.length; i++) {
        if (this.team[i].avatarPath != '' && this.team[i].avatarPath != undefined) {
          this.team[i].avatarUrl = await getDownloadURL(storageRef(getStorage(), this.team[i].avatarPath))
        }
      }
      this.teamReady = true
    })
  }

}
