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
  userIsAuth:boolean=false

  createUser(userData: any) {
    this.fireauth.createUserWithEmailAndPassword(userData.email, userData.password).then(() => {
      this.fire.setUserData(userData).then()
    })
  }

  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(async (cred) => {
      await this.isAuth()
      await this.router.navigate([''])
    })
  }

  logout(){
    this.fireauth.signOut().then(()=> {
      this.fire.userData.role.role_id=0
      this.router.navigate(['/login'])
    }, function(error) {
      // An error happened.
    });
  }
  //Spectate user authentication
  async isAuth() {
    await this.fireauth.onAuthStateChanged(async user => {
      if (user) {
        this.userAuthData = user;
        //Getting user data from database
        await this.fire.getUserData(this.userAuthData.email)
        this.userIsReady = true
        this.userIsAuth=true
      } else {
        this.userIsReady = true
        this.userIsAuth=false
      }
    })
  }
}
