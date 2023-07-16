import { Component, OnInit } from '@angular/core';
import {FireService} from "../../services/fire.service";
import {FaqService} from "../../services/faq.service";

@Component({
  selector: 'app-faq-form',
  templateUrl: './faq-form.component.html',
  styleUrls: ['./faq-form.component.css']
})
export class FaqFormComponent implements OnInit {

  constructor(private fire:FireService,private faq:FaqService) { }

  FAQuestion:any={
    id:'',
    question:'',
    answer:'',
    section:''
  }
  sections=[
    {name:'',
      systemName:''}
  ]


  ngOnInit(): void {
    this.sections=Object.values( this.fire.systemData.faq.sections)
    this.getFAQ()
    console.log(this.FAQuestion)
  }

  getFAQ(){
    if(this.faq.formInfo.action=='edit'){
      this.FAQuestion=this.faq.selectedQuestion
    }
  }

  async addFAQ() {

    await this.faq.setFAQ(this.FAQuestion)
  }

}
