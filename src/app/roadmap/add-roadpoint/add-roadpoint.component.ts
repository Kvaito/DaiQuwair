import { Component, OnInit } from '@angular/core';
import {RoadmapService} from "../../services/roadmap.service";
import {FireService} from "../../services/fire.service";

@Component({
  selector: 'app-add-roadpoint',
  templateUrl: './add-roadpoint.component.html',
  styleUrls: ['./add-roadpoint.component.css']
})
export class AddRoadpointComponent implements OnInit {

  constructor(private road:RoadmapService,private fire:FireService) { }

  ngOnInit(): void {
  }
  message=''
  positions:Array<any>=Object.values(this.fire.systemData.positions)

  newPoint:any={
    id:this.fire.generateId(),
    title:'',
    deadline:'',
    start:'',
    description:'',
    status:false,
    tasks:[]
  }

  createPoint(){
    console.log('newPoint',this.newPoint)
    // Проверка полей
    this.road.setPoint(this.newPoint)
    this.message='Пункт успешно добавлен!'
    this.newPoint.id=this.fire.generateId()
  }

  addTaskForm(){
    this.newPoint.tasks.push({
      id:this.fire.generateId(),
      point_id:this.newPoint.id,
      title:'',
      position:'',
      description:'',
      status:''
    })
  }
}
