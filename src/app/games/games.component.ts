import { Component, OnInit } from '@angular/core';
import {FireService} from "../fire.service";
import {getDownloadURL, getStorage, ref as storageRef} from "@angular/fire/storage";

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  constructor(public fire:FireService) { }
  games:any
  gamesReady:boolean=false

  ngOnInit(): void {
    this.games=Object.values(this.fire.systemData.games)
    this.handleNotes()
  }

  async handleNotes() {
    //Преобразовать content в удобную для отображения строку
    for (let i = 0; i < this.games.length; i++) {
      let gameDescription: string = ''
      for (let j = 0; j < this.games[i].description.length; j++) {
        if (this.games[i].description.type == 'header') {
          this.games[i].description.data.text = ""
        }
        gameDescription = gameDescription + this.games[i].description[j].data.text + "</br>"
        //Получение и прикрепление к записи ссылки на картинку, если такая есть
        if (this.games[i].coverPath != '') {
          this.games[i].coverUrl= await getDownloadURL(storageRef(getStorage(), this.games[i].coverPath))
        }
      }
      this.games[i].description = gameDescription
    }
    this.gamesReady = true
  }
}
