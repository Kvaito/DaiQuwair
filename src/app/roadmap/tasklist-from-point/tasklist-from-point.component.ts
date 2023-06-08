import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-tasklist-from-point',
  templateUrl: './tasklist-from-point.component.html',
  styleUrls: ['./tasklist-from-point.component.css']
})
export class TasklistFromPointComponent implements OnInit {

  @Input() point={
    tasks:[{
      title:'',
      status:'progress'
    }],
    start:'',
    deadline:'',
    width:''
  }

  constructor() { }

  ngOnInit(): void {
  }

}
