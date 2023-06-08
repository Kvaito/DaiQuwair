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

  get selectedPoint() {
    return this.road.selectedPoint;
  }

  createPoint(){
    // Проверка полей
    this.road.setPoint(this.road.selectedPoint)
    this.message='Пункт успешно добавлен!'
    this.road.selectedPoint.id=this.fire.generateId()
  }

  addTaskForm(){
    this.road.selectedPoint.tasks.push({
      id:this.fire.generateId(),
      point_id:this.road.selectedPoint.id,
      title:'',
      position:'',
      description:'',
      status:'progress'
    })
  }
}
