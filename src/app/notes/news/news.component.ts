import { Component, OnInit } from '@angular/core';
import {FireService} from "../../services/fire.service";
import {getDownloadURL, getStorage,ref as storageRef} from "@angular/fire/storage";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  constructor(private fire:FireService) { }
  notesReady:boolean=false
  message:string=''
  notes:any
  ngOnInit(): void {
   this.getNotes()
  }

  async getNotes() {
    await this.fire.getNotes().then(()=>{
      this.notes =this.fire.notes
      this.handleNotes()})
  }

  async handleNotes() {
    this.notes = Object.values(this.notes)
    let rawNotes: any = []
    let rawNotesCounter = 0
    // console.log('Записи до обработки',this.notes)
    //Вытащить записи из автора
    for (let i = 0; i < this.notes.length; i++) {
      this.notes[i] = Object.values(this.notes[i])
      for (let j = 0; j < this.notes[i].length; j++) {
        rawNotes[rawNotesCounter] = this.notes[i][j]
        rawNotesCounter++
      }
    }
    //Преобразовать content в удобную для отображения строку
    for (let i = 0; i < rawNotes.length; i++) {
      let noteText: string = ''
      for (let j = 0; j < rawNotes[i].content.length; j++) {
        if (rawNotes[i].content.type == 'header') {
          rawNotes[i].content[j].data.text = ""
        }
        noteText = noteText + rawNotes[i].content[j].data.text + "</br>"
        //Получение и прикрепление к записи ссылки на картинку, если такая есть
        if (rawNotes[i].cover_path != '') {
         rawNotes[i].imageUrl= await getDownloadURL(storageRef(getStorage(), rawNotes[i].cover_path))
        }
        // else{
        //   this.textWidth='100%'
        // }
      }
      rawNotes[i].content = noteText
    }
    //сожрать картинку
    this.notes = rawNotes

    this.notesReady = true
  }
}
