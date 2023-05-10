import { Injectable } from '@angular/core';
import {child, get, getDatabase, ref} from "firebase/database";
import {set} from "@angular/fire/database";
import {FireService} from "./fire.service";

@Injectable({
  providedIn: 'root'
})
export class RoadmapService {

  roadmap:any
  roadmapIsReady=false

  constructor(private fire:FireService) { }

  async getRoadmap() {
    await get(child(this.fire.dbRef, "roadmap/"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.roadmap = Object.values(snapshot.val()) ;
          console.log('Roadmap', this.roadmap)
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
      status: false,
      tasks: point.tasks
    })
    //Обновляем данные на сайте
    this.getRoadmap()
  }
}
