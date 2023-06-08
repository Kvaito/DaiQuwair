import { Component, OnInit } from '@angular/core';
import EditorJS from "@editorjs/editorjs";
import {FireService} from "../../services/fire.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css']
})
export class AddGameComponent implements OnInit {

  constructor(public fire:FireService,private router:Router) { }
  Header = require('@editorjs/header');
  Underline = require('@editorjs/underline');
  editor: any
  genresRaw:string=''
  game={
    systemName:'',
    gameTitle:'',
    description:'',
    coverPath:'',
    genres:['']
  }
  coverDownloadUrl=''
  coverUploaded:boolean=false
  ngOnInit(): void {
    this.editor = new EditorJS({
      tools: {
        underline: {
          class: this.Underline,
          inlineToolbar: true
        },
      },
      holder: 'editor-js',
      placeholder: 'Описание игры!',
      autofocus: true
    })
  }

  async uploadImage($event: any) {
    this.game.coverPath= "/game_covers/" + this.game.gameTitle + "/" + Math.random()
   await this.fire.uploadImage($event.target.files[0],this.game.coverPath)
    this.coverUploaded=true
  }

  async createGame() {
    await this.editor.save().then((outputData: any) => {
      this.game.description = outputData.blocks
    })
    this.game.genres = this.genresRaw.split(' ')
    await this.fire.createGame(this.game)
    await this.router.navigate(['/games'])
  }
}
