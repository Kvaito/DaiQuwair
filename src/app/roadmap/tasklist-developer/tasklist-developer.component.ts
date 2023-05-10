import { Component, OnInit } from '@angular/core';
import {RoadmapService} from "../../services/roadmap.service";
import {FireService} from "../../services/fire.service";

@Component({
  selector: 'app-tasklist-developer',
  templateUrl: './tasklist-developer.component.html',
  styleUrls: ['./tasklist-developer.component.css']
})
export class TasklistDeveloperComponent implements OnInit {

  constructor(private fire:FireService,private road:RoadmapService) { }

  tasks:any=[]
  tasksIsReady:boolean=false

  ngOnInit(): void {
    this.findTask()
  }

  async findTask() {
    //Нахождение задач, которые определены для должности авторизованного пользователя
    //Looking for tasks, that described for position of authorized user
    await this.road.getRoadmap()
    let roadArray = [{tasks: [{position: {systemName: ''}}]}]
    let position = this.fire.userData.position.systemName
    roadArray = this.road.roadmap
    console.log('Новый', roadArray)
    let bufferArray
    let tasks:any=[]
    roadArray.forEach(function (point) {
      bufferArray = point.tasks.find(function (task) {
          return task.position.systemName == position
        }
      )
      tasks.push(bufferArray)
    })
    console.log(tasks)
    this.tasks = tasks
    this.tasksIsReady = true
  }
}
