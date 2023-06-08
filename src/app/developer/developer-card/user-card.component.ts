import {Component, Input, OnInit} from '@angular/core';
import {getDownloadURL, getStorage, ref as storageRef} from "@angular/fire/storage";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  constructor() {
  }

  @Input() userData = {
    name: '',
    surname: '',
    position: {name: '', systemName: ''},
    avatarUrl:'',
    avatarPath:''
  }
  @Input() flexDirection='horizontal'
  @Input() nameColor='white'

  ngOnInit(): void {
    this.getUserAvatar()
  }

  async getUserAvatar() {
    this.userData.avatarUrl = await getDownloadURL(storageRef(getStorage(), this.userData.avatarPath))
    console.log(this.userData.avatarUrl)

  }


}
