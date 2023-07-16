import { Component, OnInit } from '@angular/core';
import {GameService} from "../../services/game.service";

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

  constructor(private games:GameService) { }
  gameList:any
  ngOnInit(): void {
    this.games.getGames().then(r => {
      this.gameList=Object.values(this.games.games)
      console.log(this.gameList)
    })
  }

  edit(game:any){
    this.games.formInfo.status=true
    this.games.formInfo.action='edit'
    this.games.selectedGame=game
  }
}
