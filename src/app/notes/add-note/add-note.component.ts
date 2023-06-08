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
      placeholder: 'Такооооое было',
      autofocus: true
    })
  }

  async saveNote() {
    //Getting data from editor.js blocks
    await this.editor.save().then((outputData: any) => {
      this.note.content = outputData.blocks
    }).catch((error: any) => {
      console.log('Saving failed: ', error)
    });
    //Getting current date and creating needed view for this
    this.note.rawDate = new Date()
    this.note.sortDate=this.note.rawDate.toLocaleDateString('en-US')
      this.note.date=this.note.rawDate.toLocaleString('ru', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    this.note.author = this.fire.userData.nickname
    this.note.author_id=this.fire.userData.id
    //Creating note identificator
    this.note.id=this.fire.generateId();
    if(this.note.tags!=''){
      this.note.tags=this.determineTags(this.note.tags)
    }
    // this.addCheckboxTagToList()
    console.log(this.note)
    await this.fire.setNote(this.note)
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

  //Работа с тегами
  determineTags(tagsString:string){
    let tagsArray:Array<any>=[]
    if(tagsString==''){
      tagsArray=['?']
    }else{
      tagsArray=tagsString.split(' ')
    }
    return tagsArray
  }
  addCheckboxTagToList(){
    if(this.checkboxTags!=undefined ||this.checkboxTags.length!=0){
      console.log(this.checkboxTags)
      this.note.tags=this.note.tags+this.checkboxTags
    }
  }
}
