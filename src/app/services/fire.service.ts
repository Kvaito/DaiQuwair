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
  notes:any={}
  careers:any={}
  selectedNote: any;
  storage=getStorage()
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
      id:id
    });
  }

  //Использует первую часть почты для нахождения пользователя
  async getUserData(email: string) {
    let id: string = email.split('@')[0].toLowerCase()
    await get(child(this.dbRef, "users/" + id+'/'))
      .then((snapshot) => {
        if (snapshot.exists()) {
         this.userData = snapshot.val();
         console.log('userData',this.userData)
        }
      })
  }

  //Новости
  async setNote(note: any) {
    const db = getDatabase()
    console.log('Хочу создать следующую запись:', note)
    await set(ref(db, 'notes/' + note.author_id+'/'+note.id), {
      author:note.author,
      author_id:note.author_id,
      title:note.title,
      cover_path:note.cover_path,
      content:note.content,
      date:note.date,
      tags:note.tags,
      id:note.id
    })
    console.log('Пацаны, я создал запись', note)
  }

  //Получение записей с возможностью использовать фильтры
  // 'author_filter' - поиск по автору
  //
  async getNotes(options:any='',author:string=''){
    switch (options){
      //Получение всех записей
      case '':{
        await get(child(this.dbRef, "notes/"))
          .then((snapshot) => {
            if (snapshot.exists()) {
              console.log('Полученные записи',snapshot.val())
              this.notes=snapshot.val()
            }
          })
        break;
      }
      //Поиск по автору
      case 'author_filter':{
        await get(child(this.dbRef, "notes/"+author+'/'))
          .then((snapshot) => {
            if (snapshot.exists()) {
              console.log('Полученные записи',snapshot.val())
              this.notes=snapshot.val()
            }
          })
        break;
      }
    }

  }

  async deleteNote(author_id:string,note_id:string) {
    const db = getDatabase()
    await remove(ref(db, 'notes/' + author_id + '/' + note_id))
    location.reload();
  }
  //Вакансии
  async getCareers(){
    await get(child(this.dbRef, "careers/"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.careers = snapshot.val();
          console.log('careers',this.careers)
        }
      })
  }

  //Роадмап


  //Игры
  async createGame(game:any) {
    //обработка жанров
    await set(ref(this.db, 'system/games/' + game.systemName + '/'), game);
    console.log('Игра добавлена')
  }

  //Всопомогательные инструменты
  async uploadImage(localPath: string,firePath:string) {
    this.FireStorage.upload(firePath, localPath).then( async () => {
      this.actualImageDownloadUrl= await getDownloadURL(storageRef(getStorage(), firePath))
    })
  }

  async descriptEditorBlocks(blocksObject: any) {
    // blocksObject = Object.values(blocksObject)
    let descriptedString: string = ''
    //Преобразовать content в удобную для отображения строку
    for (let i = 0; i < blocksObject.length; i++) {
      for (let j = 0; j < blocksObject[i].length; j++) {
        if (blocksObject[i].type == 'header') {
          blocksObject[i].text = ""
        }
        descriptedString = descriptedString + blocksObject[i].data.text + "</br>"
      //   //Получение и прикрепление к записи ссылки на картинку, если такая есть
      //   if (blocksObject[i].coverPath != '') {
      //     blocksObject[i].coverUrl = await getDownloadURL(storageRef(getStorage(), blocksObject[i].coverPath))
      //   }
      }
      blocksObject[i] = descriptedString
    }
    // return blocksObject
  }
}
