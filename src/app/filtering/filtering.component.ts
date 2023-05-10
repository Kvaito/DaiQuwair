import {Component, Input, OnInit} from '@angular/core';
import {FireService} from "../services/fire.service";

@Component({
  selector: 'app-filtering',
  templateUrl: './filtering.component.html',
  styleUrls: ['./filtering.component.css']
})
export class FilteringComponent implements OnInit {

  option: string = 'date'
  filterType: string = 'new'
  filteredNotes: any

  constructor(private fire: FireService) {
  }

  @Input() notes: any = [{
    date: '',
    systemDate: new Date('')
  }]

  ngOnInit(): void {
    console.log(this.notes)
  }

  filterNotes() {
    let sortedNotes = []
    switch (this.option) {
      case('date'): {
        this.notes = this.notes.map(function (value: { systemDate: Date; date: string | number | Date; }) {
          value.systemDate = new Date(value.date)
        })
        switch (this.filterType) {
          case 'new': {
            sortedNotes = this.notes.sort((objA: { systemDate: { getTime: () => number; }; }, objB: { systemDate: { getTime: () => number; }; }) =>
              objA.systemDate.getTime() - objB.systemDate.getTime())
            break;
          }
          case 'old': {
            sortedNotes = this.notes.sort((objA: { systemDate: { getTime: () => number; }; }, objB: { systemDate: { getTime: () => number; }; }) =>
              objB.systemDate.getTime() - objA.systemDate.getTime())
            break;
          }
        }
        break;
      }
      case('popularity'): {
        switch (this.filterType) {
          case 'highrate': {
            break;
          }
          case 'comments': {
            break;
          }
        }
        break;
      }
    }
    this.notes=sortedNotes
    console.log(sortedNotes)
  }
}
