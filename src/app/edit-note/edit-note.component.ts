import { Component, OnInit } from '@angular/core';
import {FireService} from "../fire.service";
import EditorJS from "@editorjs/editorjs";

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.css']
})

export class EditNoteComponent implements OnInit {
  note: any = {
    content: ''
  }
  newImageData: any = {}
  imageStorageUrl: string = '';
  //Переменные для editor.js
  Underline = require('@editorjs/underline');
  editor: any
  constructor(private fire: FireService) { }

  ngOnInit(): void {
    this.note=this.fire.selectedNote
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

}
