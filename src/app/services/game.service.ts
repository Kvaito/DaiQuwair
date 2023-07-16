import {Inject, Injectable} from '@angular/core';
import {set} from "@angular/fire/database";
import {child, get, getDatabase, ref} from "firebase/database";
import {Game} from "../../models/Game";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor( public selectedGame:Game,@Inject(Game) public games:Game[]) {

  }
  db=getDatabase()
  dbRef=ref(this.db)
  formInfo={
    status:false,
    action:'add'
  }
  //Games
  async setGame(game:Game) {
    //обработка жанров
    await set(ref(this.db, 'system/games/' + game.systemName + '/'), game);
    console.log('Игра добавлена')
  }

  async getGames() {
    await get(child(this.dbRef, "system/games"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.games = Object.values(snapshot.val()) ;
        }
      })
  }
}
