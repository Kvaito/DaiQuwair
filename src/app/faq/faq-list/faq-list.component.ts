import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FireService} from "../../services/fire.service";
import {FaqService} from "../../services/faq.service";

@Component({
  selector: 'app-faq-list',
  templateUrl: './faq-list.component.html',
  styleUrls: ['./faq-list.component.css']
})
export class FaqListComponent implements OnInit {
  @Output() startEdit = new EventEmitter()

  constructor(private fire: FireService,public faq:FaqService) { }
  FAQ = [[{
    answer: '', section: {name: ''},
    question: '',reveal:false
  }]]
  faqIsReady: boolean = false

  ngOnInit(): void {
    this.faq.getFAQ()
  }

  handleQuestion(){

  }

  edit(question: any){
    this.faq.formInfo.status=true
    this.faq.formInfo.action='edit'
    this.faq.selectedQuestion=question
  }
}
