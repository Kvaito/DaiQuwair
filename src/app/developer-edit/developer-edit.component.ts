import { Component, OnInit } from '@angular/core';
import {FireService} from "../services/fire.service";
import {getDownloadURL} from "firebase/storage";
import {getStorage, ref as storageRef} from "@angular/fire/storage";
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Component({
  selector: 'app-developer-edit',
  templateUrl: './developer-edit.component.html',
  styleUrls: ['./developer-edit.component.css']
})
export class DeveloperEditComponent implements OnInit {

  constructor(private fire:FireService,private FireStorage: AngularFireStorage) { }
  userData:any={
    name:'',
    nickname:'',
    surname:'',
    password:'',
    avatarPath:''
  }
    repeatPassword:string=''
    imageData:any={}
    message:string=''
  ngOnInit(): void {
    this.userData=this.fire.userData
    this.userData.avatarPath=''
    this.repeatPassword=this.userData.password
  }

  async uploadImage($event: any) {
    this.imageData.localPath = $event.target.files[0]
    this.imageData.cloudPath = "/avatars/" + this.fire.userData.id + "/" + Math.random()
    //Загрузка картинки
    this.FireStorage.upload(this.imageData.cloudPath, this.imageData.localPath).then( async () => {
      this.fire.userData.avatarUrl = await getDownloadURL(storageRef(getStorage(), this.imageData.cloudPath))
      this.imageData.imageUploaded=true
      this.userData.avatarPath=this.imageData.cloudPath
    })
  }

  editProfile(){
    if(this.userData.password==this.repeatPassword){
      this.fire.setUserData(this.userData)
      this.message='Изменения сохранены'
    }
    else{
      this.message='Повторите пароль верно'
    }
  }

}
