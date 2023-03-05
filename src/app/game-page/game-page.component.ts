import { Component, OnInit } from '@angular/core';
import {FireService} from "../fire.service";

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit {

  constructor(public fire:FireService) { }
  selectedGame:any
  filteredNotes=['']

  ngOnInit(): void {
    this.selectedGame=this.fire.selectedGame
    console.log(this.selectedGame)
    this.filteredNotes=
  }

}
