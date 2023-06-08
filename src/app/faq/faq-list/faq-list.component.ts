import { Component, OnInit } from '@angular/core';
import {FireService} from "../../services/fire.service";
import {FaqService} from "../../services/faq.service";

@Component({
  selector: 'app-faq-list',
  templateUrl: './faq-list.component.html',
  styleUrls: ['./faq-list.component.css']
})
export class FaqListComponent implements OnInit {

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

}
