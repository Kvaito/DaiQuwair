import { Injectable } from '@angular/core';
import {set} from "@angular/fire/database";
import {child, get, getDatabase, ref} from "firebase/database";
import {FireService} from "./fire.service";

@Injectable({
  providedIn: 'root'
})
export class FaqService {

  FAQ = [[{
    answer: '', section: {name: ''},
    question: '',reveal:false
  }]]
  selectedQuestion={

  }
  db=getDatabase()
  dbRef=ref(this.db)
  formInfo={
    status:false,
    action:'add'
  }

  constructor(private fire:FireService) {

  }

  async getFAQ() {
    await get(child(this.dbRef, "faq/"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.FAQ = snapshot.val();
        }
      })
      this.FAQ = Object.values(this.FAQ)
      for (let i = 0; i < this.FAQ.length; i++) {
        this.FAQ[i] = Object.values(this.FAQ[i])
      }
  }
  //FAQ
  async setFAQ(question:any){
    if(question.id==''){
      question.id=this.fire.generateId()
    }
    await set(ref(this.db, 'faq/' + question.section.systemName+'/'+question.id), {
      id:question.id,
      question:question.question,
      answer:question.answer,
      section:question.section
    })
    this.getFAQ()
  }

}
