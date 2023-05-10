import {Component, OnInit} from '@angular/core';
import EditorJS from "@editorjs/editorjs";
import {FireService} from "../../services/fire.service";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {getDownloadURL} from "firebase/storage";
import {getStorage, ref as storageRef} from "@angular/fire/storage";

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent implements OnInit {
  Header = require('@editorjs/header');
  Underline = require('@editorjs/underline');
  editor: any
  note:any={
    author:'',
    title:'',
    cover_path:'',
    content:'',
    date:'',
    tags:[],
    id:'',
    game:'Studio News'
  }
  imageData={
    localPath:'',
    cloudPath:'',
    downloadUrl:'',
    imageUploaded:false
  }
  checkboxTags:any
  games=[{gameTitle:''}]

  constructor(public fire:FireService,private FireStorage: AngularFireStorage) {
  }

  ngOnInit(): void {
    this.games=Object.values(this.fire.systemData.games)
    this.editor = new EditorJS({
      tools: {
        underline: {
          class: this.Underline,
          inlineToolbar: true
        },
      },
      holder: 'editor-js',
      placeholder: 'Расскажи, что произошло!',
      autofocus: true
    })
  }

  async saveNote() {
    //Получение данных из блока editor.js
    await this.editor.save().then((outputData: any) => {
      this.note.content = outputData.blocks
    }).catch((error: any) => {
      console.log('Saving failed: ', error)
    });
    //Получение нынешней даты и преобразование на русский язык
    this.note.date = new Date().toLocaleString('ru', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    this.note.author = this.fire.userData.nickname
    this.note.author_id=this.fire.userData.id
    //Создание идентификатора записи
    this.note.id=new Date().getTime()
    if(this.note.tags!=''){
      this.note.tags=this.determineTags(this.note.tags)
    }
    // this.addCheckboxTagToList()
    await this.fire.setNote(this.note)
  }

  async uploadImage($event: any) {
    this.imageData.localPath = $event.target.files[0]
    this.imageData.cloudPath = "/note_covers/" + this.fire.userData.id + "/" + Math.random()
    //Загрузка картинки
    this.FireStorage.upload(this.imageData.cloudPath, this.imageData.localPath).then( async () => {
      this.imageData.downloadUrl = await getDownloadURL(storageRef(getStorage(), this.imageData.cloudPath))
      this.imageData.imageUploaded=true
      this.note.cover_path=this.imageData.cloudPath
    })
  }

  //Работа с тегами
  determineTags(tagsString:string){
    let tagsArray:Array<any>=[]
    tagsArray=tagsString.split(' ')
    return tagsArray
  }
  addCheckboxTagToList(){
    if(this.checkboxTags!=undefined ||this.checkboxTags.length!=0){
      console.log(this.checkboxTags)
      this.note.tags=this.note.tags+this.checkboxTags
    }
  }
}
