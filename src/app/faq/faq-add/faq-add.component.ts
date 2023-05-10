import { Component, OnInit } from '@angular/core';
import EditorJS from "@editorjs/editorjs";
import {FireService} from "../../services/fire.service";

@Component({
  selector: 'app-faq-add',
  templateUrl: './faq-add.component.html',
  styleUrls: ['./faq-add.component.css']
})
export class FaqAddComponent implements OnInit {

  constructor(private fire:FireService) { }

  FAQuestion:any={
    id:'',
    question:'',
    answer:'',
    section:''
  }
  sections=[
    {name:'',
    systemName:''}
  ]
  Underline = require('@editorjs/underline');
  editor: any

  ngOnInit(): void {
    this.sections=Object.values( this.fire.systemData.faq.sections)
    this.editor = new EditorJS({
      tools: {
        underline: {
          class: this.Underline,
          inlineToolbar: true
        },
      },
      holder: 'editor-js',
      placeholder: 'Ответ на вопрос',
      autofocus: true
    })
  }

  async addFAQ() {
    await this.editor.save().then((outputData: any) => {
      this.FAQuestion.answer = outputData.blocks
    })
    console.log(this.FAQuestion)
    await this.fire.addFAQ(this.FAQuestion)
  }

}
