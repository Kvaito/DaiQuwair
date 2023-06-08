import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {child, get, getDatabase, ref, update} from "firebase/database";
import {push, remove, set} from "@angular/fire/database";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {getStorage, ref as storageRef, getDownloadURL} from "firebase/storage";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class FireService {
  db=getDatabase()
  dbRef=ref(this.db)
  systemData:any={}
  siteIsReady:boolean=false
  userData:any= {
    role:{
      role_id:0
    }
  }
  selectedDev:any={}
  notes:any
  comments:any
  careers:any={}
  faq:any={}
  selectedNote: any;
  storage=getStorage()
  team:any;
  actualImageDownloadUrl:string=''

  constructor(private router: Router, private FireStorage: AngularFireStorage) { }

  //Должности
  async addPosition(newPosition:any) {
    await set(ref(this.db, 'system/positions/'+newPosition.systemName+'/' ), {
     name:newPosition.positionName,
      systemName:newPosition.systemName
    });
  }

  async getSystem() {
    await get(child(this.dbRef, "system/"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.systemData = snapshot.val();
          console.log('System Data',this.systemData)
          //Позволяем прогружаться остальной части сайта после получения всех важных данных
          this.siteIsReady=true
        }
      })
    //Обработка данных
    this.systemData.tags=Object.values(this.systemData.tags)
  }
  //Сотрудники
  async setUserData(userData: any) {
    let id:string=userData.email.split('@')[0].toLowerCase()
    await set(ref(this.db, 'users/' + id + '/'), {
      nickname:userData.nickname,
      email:userData.email,
      password:userData.password,
      name:userData.name,
      surname:userData.surname,
      role:userData.role,
      position:userData.position,
      id:id,
      avatarPath:userData.avatarPath
    });
  }

  async getTeam() {
    await get(child(this.dbRef, "users/"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.team = snapshot.val();
        }
      })
  }

  //Use email as id for user searching
  //options:
  // ''- Get active user
  // 'getDev'- Get data about any developer
  async getUserData(email: string,options:string='') {
    let id: string = email.split('@')[0].toLowerCase()
    await get(child(this.dbRef, "users/" + id+'/'))
      .then((snapshot) => {
        if (snapshot.exists()) {
          switch (options){
            case(''):{
              this.userData = snapshot.val();
              console.log('userData',this.userData)
              break;
            }
            case('getDev'):{
              this.selectedDev= snapshot.val();
              break;
            }
          }

        }
      })
  }

  //News
  async setNote(note: any) {
    await set(ref(this.db, 'notes/' + note.author_id+'/'+note.id), {
      author:note.author,
      author_id:note.author_id,
      title:note.title,
      cover_path:note.cover_path,
      content:note.content,
      date:note.date,
      tags:note.tags,
      game:note.game,
      id:note.id,
      status:note.status,
      comments:[],
      sortDate:note.sortDate,
      rate:0
    })
  }

  //Получение записей с возможностью использовать фильтры
  // 'author_filter' - поиск по автору
  // 'fromId' - получить отдельную запись по ID
  async getNotes(options:any='',author:string='',noteId:number=0){
    switch (options){
      //Get ALL notes
      case '':{
        await get(child(this.dbRef, "notes/"))
          .then((snapshot) => {
            if (snapshot.exists()) {
              this.notes=snapshot.val()
            }
          })
        break;
      }
      //Searching for author
      case 'author_filter':{
        await get(child(this.dbRef, "notes/"+author+'/'))
          .then((snapshot) => {
            if (snapshot.exists()) {
              this.notes=snapshot.val()
            }
          })
        break;
      }
      //Select only main news
      case 'fromId':{
        await get(child(this.dbRef, "notes/"))
          .then((snapshot) => {
            if (snapshot.exists()) {
              let allNotes=[[]]
              allNotes=Object.values(snapshot.val())
              for(let i=0;i<allNotes.length;i++){
                allNotes[i]=Object.values(allNotes[i])
                //find note with ID equivalent to filter
                this.notes=allNotes[i].find((note: { id: number; })=> note.id===Number(noteId)
                )
                if(this.notes!=undefined){
                  break;
                }
              }
            }
          })
        break;
      }
    }

  }

  async setRate(rate:number,noteId:number,author:string){
    await update(ref(this.db, 'notes/' + author+'/'+noteId), {
      rate:rate
    })
  }

  //Comments
  async setComment(comment:any){
    await set(ref(this.db, 'notes/' + comment.parentNote.author+'/'+comment.parentNote.noteId+'/comments/'+comment.id), {
        id:comment.id,
        author:comment.author,
        content:comment.content,
        parentNote:comment.parentNote
    })
  }
  async getComments(note_id:number,author:string){
    await get(child(this.dbRef, 'notes/' + author+'/'+note_id+'/comments/'))
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.comments = snapshot.val();
        }
      })
  }

  async deleteNote(author_id:string,note_id:string) {
    const db = getDatabase()
    await remove(ref(db, 'notes/' + author_id + '/' + note_id))
    location.reload();
  }
  //Careers
  async getCareers(){
    await get(child(this.dbRef, "careers/"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.careers = snapshot.val();
        }
      })
  }

  //Games
  async createGame(game:any) {
    //обработка жанров
    await set(ref(this.db, 'system/games/' + game.systemName + '/'), game);
    console.log('Игра добавлена')
  }

  //Helpful tools
  async uploadImage(localPath: string,firePath:string) {
    this.FireStorage.upload(firePath, localPath).then( async () => {
      this.actualImageDownloadUrl= await getDownloadURL(storageRef(getStorage(), firePath))
    })
  }

  generateId(){
    return new Date().getTime()
  }

  async descriptEditorBlocks(blocksArray: any) {
    let descriptedString: string = ''
    //Преобразовать content в удобную для отображения строку
      for (let i = 0; i < blocksArray.length; i++) {
        descriptedString = descriptedString + blocksArray[i].data.text + "</br>"
        // blocksArray[i] = descriptedString
        // descriptedString=''
      }
    return descriptedString
  }
}
