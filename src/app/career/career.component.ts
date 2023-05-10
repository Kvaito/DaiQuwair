import {Component, OnInit} from '@angular/core';
import {FireService} from "../services/fire.service";

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.css']
})
export class CareerComponent implements OnInit {

  constructor(private fire: FireService) {
  }

  careersReady: boolean = false
  careers:any=
    {
      art:'',
      programming:'',
      audio:''
    }

  ngOnInit(): void {
    this.getCareers()
  }

  async getCareers() {
    await this.fire.getCareers().then(() => {
      this.careers.art = Object.values(this.fire.careers.art)
      this.careers.programming = Object.values(this.fire.careers.programming)
      // this.careers.audio=Object.values(this.fire.careers.audio)
      this.careersReady=true
    })
  }
}
