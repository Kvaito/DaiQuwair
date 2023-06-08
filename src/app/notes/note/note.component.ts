import {Component, OnInit} from '@angular/core';
import {FireService} from "../../services/fire.service";
import {ActivatedRoute} from "@angular/router";
import {getDownloadURL, getStorage, ref as storageRef} from "@angular/fire/storage";

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  constructor(private fire: FireService, private activatedroute: ActivatedRoute) {
  }

  note = {
    title: '',
    comments: [],
    image_url: '',
    cover_path: '',
    content: '',
    rate: '',
    author_id: '',
    id: 0,
    date:''
  }
  noteIsReady: boolean = false
  commentsReady: boolean = false
  noteId: number = 1
  author: any = {
    name: '',
    surname: '',
    position: {name: '', systemName: ''}
  }

  ngOnInit(): void {
    this.getNote()
  }

  async getNote() {
    this.activatedroute.queryParams.subscribe(data => {
      this.noteId = data['noteId']
    })
    //Get note with ID
    await this.fire.getNotes('fromId', '', this.noteId).then(() =>
      this.note = this.fire.notes
    )
    //Get cover-image
    if (this.note.cover_path != '') {
      this.note.image_url = await getDownloadURL(storageRef(getStorage(), this.note.cover_path))
    }
    //Descript content in default string
    this.note.content = await this.fire.descriptEditorBlocks(this.note.content)
    //Get author
    await this.getAuthor()
    this.noteIsReady = true
  }

  async getAuthor() {
    await this.fire.getUserData(this.note.author_id, 'getDev').then(async () => {
        this.author = this.fire.selectedDev
      }
    )
  }

  async setRating(rate: number) {
    let noteIdString = String(this.note.id)
    let userRateInfo = localStorage.getItem(noteIdString)
    console.log(userRateInfo)
    if ((userRateInfo == null) || (userRateInfo == 'plus' && rate < 0) || (userRateInfo == 'minus' && rate > 0)) {
      if (userRateInfo) {
        this.note.rate = this.note.rate + 2 * rate
      } else {
        this.note.rate = this.note.rate + rate
      }
      this.rememberUserRate(rate, noteIdString)
      await this.fire.setRate(rate, this.note.id, this.note.author_id)
    } else {
      console.log('Можно отдать только один голос на рейтинг')
    }
  }

  rememberUserRate(rate: number, noteIdString: string) {
    if (rate > 0) {
      localStorage.setItem(noteIdString, 'plus')
    } else {
      localStorage.setItem(noteIdString, 'minus')
    }
  }
}
