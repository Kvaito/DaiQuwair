import {Component, OnInit} from '@angular/core';
import EditorJS from "@editorjs/editorjs";
import {FireService} from "../services/fire.service";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {getDownloadURL} from "firebase/storage";
import {getStorage, ref as storageRef} from "@angular/fire/storage";

@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html',
  styleUrls: ['./developer.component.css']
})
//Создание отдельных компонентов для create_note, edit_note, удобное получение данных пользователя
export class DeveloperComponent implements OnInit {

  constructor(public fire: FireService, private auth: AuthService, private router: Router, private FireStorage: AngularFireStorage) {
  }

  isNoteCreating: boolean = false
  isNoteEditing: boolean = false
  isUserEditing:boolean=false
  authorNotes: any = []
  avatarUrl:string=''
  notesAreReady: boolean = false

  ngOnInit(): void {
    this.getAuthorNotes()
    this.getUserAvatar()
  }

  async getAuthorNotes() {
    await this.fire.getNotes('author_filter', this.fire.userData.id)
    this.authorNotes = Object.values(this.fire.notes)
    //If this developer have no notes yet, note list will not appear
    console.log('Author notes',this.authorNotes)
    if (this.authorNotes!=undefined) {
      this.notesAreReady = true
    }
  }

  async getUserAvatar(){
    if(this.fire.userData.avatarPath!=''&&this.fire.userData.avatarPath!=undefined){
      this.fire.userData.avatarUrl = await getDownloadURL(storageRef(getStorage(), this.fire.userData.avatarPath))
    }
  }

  changeEditingNote(note: any) {
    this.fire.selectedNote = note
    this.isNoteEditing = true
  }

  deleteNote(note: any) {
    this.fire.deleteNote(note.author_id, note.id)
  }

}
