import {Component, OnInit} from '@angular/core';
import {FaqService} from "../services/faq.service";

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  constructor(private faq:FaqService) {
  }
  FAQ = [[{
    answer: '', section: {name: ''},
    question: '',reveal:false
  }]]

  faqIsReady: boolean = false

  ngOnInit(): void {
    this.faq.getFAQ()
  }

}
