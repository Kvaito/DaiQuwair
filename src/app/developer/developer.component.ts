import { Component, OnInit } from '@angular/core';
import EditorJS from "@editorjs/editorjs";
import {FireService} from "../fire.service";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html',
  styleUrls: ['./developer.component.css']
})
  //Создание отдельных компонентов для create_note, edit_note, удобное получение данных пользователя
export class DeveloperComponent implements OnInit {

  constructor(public fire: FireService, private auth: AuthService, private router: Router, private FireStorage: AngularFireStorage) { }
  isNoteCreating:boolean=false
  isNoteEditing:boolean=false
  authorNotes:any=[]

  ngOnInit(): void {
    this.getAuthorNotes()

  }

  async getAuthorNotes() {
    await this.fire.getNotes('author_filter', this.fire.userData.id)
    this.authorNotes=Object.values(this.fire.notes)
  }

  changeEditingNote(note: any) {
    this.fire.selectedNote=note
    this.isNoteEditing=true
  }

  deleteNote(note:any) {
    this.fire.deleteNote(note.author_id,note.id)
  }

}
