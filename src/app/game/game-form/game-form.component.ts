import {Component, OnInit} from '@angular/core';
import {FireService} from "../../services/fire.service";
import {Router} from "@angular/router";
import {GameService} from "../../services/game.service";
import EditorJS from "@editorjs/editorjs";
import {Game} from "../../../models/Game";
import {getDownloadURL, getStorage, ref as storageRef} from "@angular/fire/storage";
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})
export class GameFormComponent implements OnInit {

  constructor(public fire: FireService, private games: GameService, public game: Game,private FireStorage: AngularFireStorage) {
  }

  Header = require('@editorjs/header');
  Underline = require('@editorjs/underline');
  editor: any
  genresRaw: string = ''
  coverUrl = ''
  coverUploaded: boolean = false

  ngOnInit(): void {
    if (this.games.formInfo.action == 'edit') {
      this.getGameData()
    }
    this.editor = new EditorJS({
      tools: {
        underline: {
          class: this.Underline,
          inlineToolbar: true
        },
      },
      holder: 'editor-js',
      placeholder: 'Описание игры!',
      autofocus: true,
      onReady: () => {
        if (this.games.formInfo.action == 'edit')
          this.editor.blocks.render({blocks: this.game.description})
      }
    })
  }

  async getGameData() {
    this.game = this.games.selectedGame
    this.coverUrl = await getDownloadURL(storageRef(getStorage(), this.game.coverPath))
    this.coverUploaded = true
  }

  async uploadImage($event: any) {
    this.coverUploaded = false
    this.game.coverPath = "/game_covers/" + this.game.gameTitle + "/" + Math.random()
    //Cover upload and getting url to show it
    if (this.game.coverPath != null) {
      this.FireStorage.upload(this.game.coverPath, $event.target.files[0]).then(async () => {
        this.coverUrl = await getDownloadURL(storageRef(getStorage(), this.game.coverPath))
        this.coverUploaded = true
      })
    }
  }

  async createGame() {
    await this.editor.save().then((outputData: any) => {
      this.game.description = outputData.blocks
    })
    this.game.genres = this.genresRaw.split(' ')
    await this.games.setGame(this.game)
  }


}
