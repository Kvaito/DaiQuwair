import {Component, OnInit} from '@angular/core';
import {FireService} from "../services/fire.service";
import {ActivatedRoute} from "@angular/router";
import {getDownloadURL, getStorage, ref as storageRef} from "@angular/fire/storage";

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit {

  constructor(public fire: FireService, private activatedroute: ActivatedRoute) {
  }

  selectedGame: any
  filteredNotes: any = [{game: ''}]
  gameTitle: string = ''
  newsAreReady: boolean = false

  ngOnInit(): void {
    this.getNotes()
  }

  async getNotes() {
    //Getting game title
    this.activatedroute.queryParams.subscribe(data => {
      this.gameTitle = data['gameTitle']
    })
    //Getting this game by its title
    let gamesArray = [{gameTitle: ''}]
    gamesArray = Object.values(this.fire.systemData.games)
    this.selectedGame = gamesArray.find(game => game.gameTitle === this.gameTitle)
    //Prepare game to show
    this.selectedGame.description = await this.fire.descriptEditorBlocks(this.selectedGame.description)
    this.selectedGame.coverUrl = await getDownloadURL(storageRef(getStorage(), this.selectedGame.coverPath))
    //Get news
    await this.fire.getNotes()
    this.filteredNotes = Object.values(this.fire.notes)
    //Find notes about selected game in notes of every author
    let filteredArray:any=[]
    for(let i=0;i<this.filteredNotes.length;i++){
      let oneAuthorArray=Object.values(this.filteredNotes[i])
      oneAuthorArray=oneAuthorArray.filter((note:any) => {
        return note.game==this.gameTitle})
      oneAuthorArray.map((value, index, array)=>{
        filteredArray.push(value)
      })
    }
    this.filteredNotes=filteredArray
    //Prepare notes to show
    this.filteredNotes.map(async (value: any) => {
      if(value.cover_path!=''){
        value.coverUrl= await getDownloadURL(storageRef(getStorage(), value.cover_path))
      }
      value.content = await this.fire.descriptEditorBlocks(value.content)
    })
    console.log('После',this.filteredNotes)
    this.newsAreReady=true

  }

}
