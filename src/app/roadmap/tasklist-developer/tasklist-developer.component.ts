import { Component, OnInit } from '@angular/core';
import {RoadmapService} from "../../services/roadmap.service";
import {FireService} from "../../services/fire.service";

@Component({
  selector: 'app-tasklist-developer',
  templateUrl: './tasklist-developer.component.html',
  styleUrls: ['./tasklist-developer.component.css']
})
export class TasklistDeveloperComponent implements OnInit {

  constructor(private fire:FireService,public road:RoadmapService) { }

  tasks:any=[]
  tasksIsReady:boolean=false

  ngOnInit(): void {
    this.findTask()
  }

  async findTask() {
    //Нахождение задач, которые определены для должности авторизованного пользователя
    //Looking for tasks, that described for position of authorized user
    await this.road.getRoadmap()
    let roadArray = [{tasks: [{position: {systemName: ''},title:'',index:0,deadline:'',detailsShow:false}],deadline:''}]
    let position = this.fire.userData.position.systemName
    roadArray = this.road.roadmap
    let neededTaskArray
    let tasks:any=[]
    roadArray.forEach(function (point) {
      neededTaskArray = point.tasks.filter(function (task) {
        if(task.position.systemName == position){
          task.index=point.tasks.indexOf(task);
          task.deadline=point.deadline;
          task.detailsShow=false;
        }
        return task.position.systemName == position
        }
      )
      if(neededTaskArray!=undefined){
        tasks=tasks.concat(neededTaskArray);
      }
    })

    this.tasks = tasks
    this.tasksIsReady = true
  }

  async completeTask(taskIndex: number,pointId:number){
    await this.road.completeTask(taskIndex,pointId)
    await this.findTask()
  }

}
