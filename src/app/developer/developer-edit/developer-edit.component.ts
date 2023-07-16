import { Component, OnInit } from '@angular/core';
import {FireService} from "../../services/fire.service";
import {getDownloadURL} from "firebase/storage";
import {getStorage, ref as storageRef} from "@angular/fire/storage";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {Developer} from "../../../models/Developer";

@Component({
  selector: 'app-developer-edit',
  templateUrl: './developer-edit.component.html',
  styleUrls: ['./developer-edit.component.css']
})
export class DeveloperEditComponent implements OnInit {

  constructor(private fire:FireService,private FireStorage: AngularFireStorage) { }
  userData:any
    oldAvatarPath:string=''
    repeatPassword:string=''
    imageData:any={}
    message:string=''
  avatarUrl:string=''
  ngOnInit(): void {
    this.userData=this.fire.userData
    this.oldAvatarPath=this.userData.avatarPath
    this.userData.avatarPath=''
    this.repeatPassword=this.userData.password
  }

  async uploadImage($event: any) {
    this.imageData.localPath = $event.target.files[0]
    this.imageData.cloudPath = "/avatars/" + this.fire.userData.id + "/" + Math.random()
    //Загрузка картинки
    this.FireStorage.upload(this.imageData.cloudPath, this.imageData.localPath).then( async () => {
      this.avatarUrl = await getDownloadURL(storageRef(getStorage(), this.imageData.cloudPath))
      this.imageData.imageUploaded=true
      this.userData.avatarPath=this.imageData.cloudPath
    })
  }

  editProfile(){
    if(this.validatePassword(this.userData.password,this.repeatPassword)){
      if(this.imageData==undefined){
        this.userData.avatarPath=this.oldAvatarPath
      }
      this.fire.setUserData(this.userData)
      this.message='Изменения сохранены'
    }
  }

  validatePassword(newPassword:string,repeatPassword:string){
    let regular = /^(?=.*\d)(?=.*[!@#$%^&_*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if(regular.test(newPassword)){
      if(newPassword==repeatPassword){
        return true
      }
      else{
        this.message='Повторите пароль верно'
        return false
      }
    }else{
      this.message='Пароль должен быть минимум длиной 8 символов и содержать минимум одну букву, одну цифру, ' +
        'один специальный символ буквы разного регистра. Безопасность важна ;)'
      return false;
    }
  }
}
