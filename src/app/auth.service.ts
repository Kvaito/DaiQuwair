import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {FireService} from "./fire.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth: AngularFireAuth, private fire: FireService, private router: Router) {
  }

  userAuthData: any = {}
  userName: any = {}
  userIsReady:boolean=false

  createUser(userData: any) {
    this.fireauth.createUserWithEmailAndPassword(userData.email, userData.password).then(() => {
      this.fire.setUserData(userData).then(r => console.log(r))
    })
  }

  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then((cred) => {
      this.isAuth()
      this.router.navigate([''])
    })
  }

  //Отслеживание, вошёл пользователь или нет
  async isAuth() {
    await this.fireauth.onAuthStateChanged(async user => {
      if (user) {
        this.userAuthData = user;
        //получение данных пользователя из базы данных
        await this.fire.getUserData(this.userAuthData.email)
        this.userIsReady = true
      } else {
        this.userIsReady = true
        console.log('Пользователь не авторизован')
      }

    })
  }
}
