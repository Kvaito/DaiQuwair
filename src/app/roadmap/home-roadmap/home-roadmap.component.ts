import { Component, OnInit } from '@angular/core';
import {RoadmapService} from "../../services/roadmap.service";

@Component({
  selector: 'app-home-roadmap',
  templateUrl: './home-roadmap.component.html',
  styleUrls: ['./home-roadmap.component.css']
})
export class HomeRoadmapComponent implements OnInit {

  constructor(private road:RoadmapService) { }
  roadmap:any=[]
  roadmapReady:boolean=false
  ngOnInit(): void {
    this.getRoadmap()
  }

  async getRoadmap() {
    await this.road.getRoadmap()
    this.roadmap = this.road.roadmap
    console.log(this.roadmap)
    this.cleanRoadmap()
  }
  //Получить массив дней
  cleanRoadmap(){
    let nowDate=new Date()
    for(let i=0;i<this.roadmap.length;i++){
      let deadline=new Date(this.roadmap[i].deadline)
      console.log(deadline)
    }
  }

}
