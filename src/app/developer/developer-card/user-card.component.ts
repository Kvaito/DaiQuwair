import {Component, Input, OnInit} from '@angular/core';
import {getDownloadURL, getStorage, ref as storageRef} from "@angular/fire/storage";
import {Developer} from "../../../models/Developer";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  constructor() {
  }

  @Input()
  userData:any;
  @Input() flexDirection='horizontal'
  @Input() nameColor='white'
  avatarUrl=''
  ngOnInit(): void {
    this.getUserAvatar()
  }

  async getUserAvatar() {
    this.avatarUrl = await getDownloadURL(storageRef(getStorage(), this.userData.avatarPath))
  }


}
