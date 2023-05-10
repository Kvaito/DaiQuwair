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
  }

  async addComment() {
    await this.editor.save().then((outputData: any) => {
      this.newComment.content = outputData.blocks
    })
    this.newComment.parentNote.author=this.note.author_id
    this.newComment.parentNote.noteId=this.note.id
    await this.fire.setComment(this.newComment)
    await this.fire.getComments(this.note.id,this.note.author_id)
    this.comments=this.fire.comments
  }

  async getComments() {
    await this.fire.getComments(this.note.id, this.note.author_id)
    if(this.fire.comments!=undefined){
      this.comments =Object.values(this.fire.comments)
      console.log(this.comments)
      for(let i=0;i< this.comments.length;i++){
        this.comments[i].content=await this.fire.descriptEditorBlocks(this.comments[i].content)
        console.log(this.comments[i])
      }
      this.commentsAreReady=true
    }

  }
}
