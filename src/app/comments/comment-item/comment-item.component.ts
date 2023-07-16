import {Component, Input, OnInit} from '@angular/core';
import {FireService} from "../../services/fire.service";
import {Developer} from "../../../models/Developer";

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.css']
})
export class CommentItemComponent implements OnInit {

  constructor(private fire:FireService) { }
  @Input() comment={
    author:{
      isDev:false,
      name:'',
      email:''
    },
    content:{},
    id:0,
    parentNote:{
      noteId:0,
      author:''
    }
  }
  authorDevData!: Developer;
  commentIsReady=false
  ngOnInit(): void {
    if(this.comment.author.isDev){
      this.getAuthorData(this.comment.author.email)
    }
    this.commentIsReady=true
  }

  async getAuthorData(email=''){
  await this.fire.getUserData(email,'getDev')
    console.log(this.fire.selectedDev)
    this.authorDevData=this.fire.selectedDev
  }
}
