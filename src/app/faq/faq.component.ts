import {Component, OnInit} from '@angular/core';
import {FireService} from "../services/fire.service";

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  constructor(private fire: FireService) {
  }

  FAQ = [[{answer: '', section: {name:''},
    question: ''
  }]]
  faqIsReady: boolean = false

  ngOnInit(): void {
    this.getFAQ()
  }

  async getFAQ() {
    await this.fire.getFAQ().then(async () => {
      this.FAQ = Object.values(this.fire.faq)
      for (let i = 0; i < this.FAQ.length; i++) {
        this.FAQ[i] = Object.values(this.FAQ[i])
        console.log(this.FAQ)
        //Get all subsection and prepare answers to correct view
        for (let j = 0; j < this.FAQ[i].length; j++) {
          this.FAQ[i][j].answer = await this.fire.descriptEditorBlocks(this.FAQ[i][j].answer)
        }
      }
      this.faqIsReady=true
    })
  }

}
