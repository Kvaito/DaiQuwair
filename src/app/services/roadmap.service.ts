import { Injectable } from '@angular/core';
import {child, get, getDatabase, ref, update} from "firebase/database";
import {remove, set} from "@angular/fire/database";
import {FireService} from "./fire.service";

@Injectable({
  providedIn: 'root'
})
export class RoadmapService {

  roadmap:any
  roadmapIsReady=false
  selectedPoint:any={
    id:this.fire.generateId(),
    title:'',
    deadline:'',
    start:'',
    description:'',
    status:'shown',
    tasks:[]
  }


  constructor(private fire:FireService) { }

  async getRoadmap() {
    await get(child(this.fire.dbRef, "roadmap/"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.roadmap = Object.values(snapshot.val()) ;
          //Позволяем прогружаться остальной части сайта после получения всех важных данных
          this.roadmapIsReady = true
        }
      })
  }

  async setPoint(point: any) {
    await set(ref(this.fire.db, 'roadmap/' + point.id), {
      id: point.id,
      title: point.title,
      deadline: point.deadline,
      start: point.start,
      description: point.description,
      status: point.status,
      tasks: point.tasks
    })
    //Обновляем данные на сайте
    this.getRoadmap()
  }

  async changePointStatus(pointId:number, status:string) {
    await update(ref(this.fire.db, 'roadmap/' + pointId), {
      status: status
    })
    this.getRoadmap()
  }

  async deletePoint(pointId: number) {
    await remove(ref(this.fire.db, 'roadmap/' + pointId))
    //Обновляем данные на сайте
    this.getRoadmap()
  }

  async completeTask(taskIndex: number,pointId:number) {
    await update(ref(this.fire.db, 'roadmap/' + pointId+'/tasks/'+taskIndex),{
      status:'completed'
    })
  }
}
