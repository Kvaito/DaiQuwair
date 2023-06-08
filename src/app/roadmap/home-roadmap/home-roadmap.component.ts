import { Component, OnInit } from '@angular/core';
import {RoadmapService} from "../../services/roadmap.service";

@Component({
  selector: 'app-home-roadmap',
  templateUrl: './home-roadmap.component.html',
  styleUrls: ['./home-roadmap.component.css']
})
export class HomeRoadmapComponent implements OnInit {

  constructor(private road:RoadmapService) { }
  roadmap:any=[
  ]
  roadmapReady:boolean=false
  field={
    widthPx:0,
    heightPx:0,
    timeline:[],
    pxPerDay:20,
  }
  firstDay: Date | any
  lastDay: Date | any
  ngOnInit(): void {
    this.getRoadmap()
  }

  async getRoadmap() {
    await this.road.getRoadmap()
    this.roadmap =this.filterRoadmap(Object.values(this.road.roadmap))
    //Пройтись по всему массиву, найти начало и конец таймлайна,
    // вычислить ширину поля
    let dayStartArray=this.roadmap.map(function(point:{start:''}) { return new Date(point.start); })
    let dayEndArray=this.roadmap.map(function(point:{deadline:''}) { return new Date(point.deadline); })
    this.firstDay = new Date(Math.min.apply(null,dayStartArray));
    this.lastDay = new Date(Math.max.apply(null,dayEndArray));
    let daysRoadTotal = (this.lastDay - this.firstDay) / (1000 * 60 * 60 * 24);
    // задать отступ и ширину каждому поинту
    for(let point of this.roadmap){
      let deadline:Date|any=new Date(point.deadline);
      let start:Date|any=new Date(point.start)
      point.daysPointTotal = ( deadline - start) / (1000 * 60 * 60 * 24);
      point.width=point.daysPointTotal*this.field.pxPerDay
      point.marginLeft=( start - this.firstDay) / (1000 * 60 * 60 * 24)*this.field.pxPerDay;
      point.cardOpened=false
      point.progress= Math.ceil(point.tasks.filter((task:any)=>{return task.status=='completed'}).length / point.tasks.length * 100)
    }
    this.roadmapReady=true
  }

  filterRoadmap(pointArray:Array<any>)
  {
    pointArray=pointArray.filter((point)=>{return point.status!='hidden'})
    pointArray.sort(function(point1:{start:''},point2:{start:''}) {
      let dateA:any = new Date(point1.start);
      let dateB:any = new Date(point2.start);
      return dateB - dateA;
    });
    return pointArray
  }

  openPointCard(){

  }
}
