import {Component, Input, OnInit} from '@angular/core';
import {FireService} from "../services/fire.service";
import EditorJS from "@editorjs/editorjs";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  //Get NoteId from parent
  @Input() note = {
    author_id: '',
    id:0
  }

  constructor(private fire:FireService) { }
  Underline = require('@editorjs/underline');
  editor: any
  newComment:any={
    author:{
      isDev:false,
      name:'',
      email:''
    },
    content:{},
    id:this.fire.generateId(),
    parentNote:{
      noteId:0,
      author:''
    }
  }
  comments:any={}
  commentsAreReady:boolean=false
  isAuth:boolean=false

  ngOnInit(): void {
    this.editor = new EditorJS({
      tools: {
        underline: {
          class: this.Underline,
          inlineToolbar: true
        },
      },
      holder: 'editor-js',
      placeholder: 'Текст комментария',
      autofocus: true
    })

    this.getComments()
    if(this.fire.userData.role.role_id!=0){
      this.isAuth=true
    }
  }

  async addComment(devData={email:'',nickname:''}) {
    await this.editor.save().then((outputData: any) => {
      this.newComment.content = outputData.blocks
    })
    this.newComment.parentNote.author=this.note.author_id
    this.newComment.parentNote.noteId=this.note.id
    if (devData.email!=''){
      console.log('бля')
      this.newComment.author.isDev=true
      this.newComment.author.email=devData.email;
      this.newComment.author.name=devData.nickname;
    }
    await this.fire.setComment(this.newComment)
    await this.getComments()
  }

  async getComments() {
    await this.fire.getComments(this.note.id, this.note.author_id)
    this.commentsAreReady=false;
    if(this.fire.comments!=undefined){
      this.comments =Object.values(this.fire.comments)
      for(let i=0;i< this.comments.length;i++){
        this.comments[i].content=await this.fire.descriptEditorBlocks(this.comments[i].content)
        //Check author. If it's a developer, so get his data too
      }
      this.commentsAreReady=true
    }
  }

  getUser(){
    return this.fire.userData
  }
}
