import { Component, OnInit } from '@angular/core';
import {FireService} from "../../services/fire.service";
import EditorJS from "@editorjs/editorjs";
import {getDownloadURL} from "firebase/storage";
import {getStorage, ref as storageRef} from "@angular/fire/storage";
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.css']
})

export class EditNoteComponent implements OnInit {
  note:any={
    author:'',
    title:'',
    cover_path:'',
    content:'',
    date:'',
    tags:[],
    status:'usual',
    id:'',
    game:'Studio News',
    rawDate:''
  }
  imageData={
    localPath:'',
    cloudPath:'',
    downloadUrl:'',
    imageUploaded:false
  }
  newImageData: any = {}
  imageStorageUrl: string = '';
  games=[{gameTitle:''}]
  //Переменные для editor.js
  Underline = require('@editorjs/underline');
  editor: any
  constructor(public fire: FireService,private FireStorage: AngularFireStorage) { }

  ngOnInit(): void {
    this.note=this.fire.selectedNote
    this.games=Object.values(this.fire.systemData.games)
    this.editor = new EditorJS({
      tools: {
        underline: {
          class: this.Underline,
          inlineToolbar: true
        },
      },
      holder: 'editor-js',
      autofocus: true,
      onReady: () => {
        this.editor.blocks.render({blocks: this.note.content})
      }
    })
  }

  async edit() {
    await this.editor.save().then((outputData: any) => {
      this.note.content = outputData.blocks

      // this.note.imageData.firePath = this.newImageData.firePath
    })
    console.log(this.note)
    this.fire.setNote(this.note)
  }

  async uploadImage($event: any) {
    this.imageData.localPath = $event.target.files[0]
    this.imageData.cloudPath = "/note_covers/" + this.fire.userData.id + "/" + this.fire.generateId()
    //Cover upload and getting url to show it
    this.FireStorage.upload(this.imageData.cloudPath, this.imageData.localPath).then( async () => {
      this.imageData.downloadUrl = await getDownloadURL(storageRef(getStorage(), this.imageData.cloudPath))
      this.imageData.imageUploaded=true
      this.note.cover_path=this.imageData.cloudPath
    })
  }
  determineTags(tagsString:string){
    let tagsArray:Array<any>=[]
    if(tagsString==''){
      tagsArray=['?']
    }else{
      tagsArray=tagsString.split(' ')
    }
    return tagsArray
  }

}
