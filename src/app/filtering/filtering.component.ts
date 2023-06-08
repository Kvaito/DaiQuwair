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
        switch (this.filterType) {
          case 'new': {
            this.notes.sort(function(note1:any,note2:any) {
              let dateA:any = new Date(note1.sortDate);
              let dateB:any = new Date(note2.sortDate);
              return dateB - dateA;
            });
            break;
          }
          case 'old': {
            this.notes.sort(function(note1:any,note2:any) {
              let dateA:any = new Date(note1.sortDate);
              let dateB:any = new Date(note2.sortDate);
              return dateA - dateB;
            });
          }
        }
        break;
      }
      case('popularity'): {
        switch (this.filterType) {
          case 'highrate': {
            this.notes.sort(function(note1:any,note2:any) {
              return note2.rate - note1.rate;
            });
            break;
          }
          case 'comments': {
            this.notes.sort(function(note1:any,note2:any) {
              if(note1.comments==undefined){
                note1.comments=[]
              }
              if(note2.comments==undefined){
                note2.comments=[]
              }
              return Object.values( note2.comments).length - Object.values( note1.comments).length;
            });
            break;
          }
        }
        break;
      }
    }
  }
}
