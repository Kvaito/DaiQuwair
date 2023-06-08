import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {RoadmapService} from "../../services/roadmap.service";

@Component({
  selector: 'app-pointlist',
  templateUrl: './pointlist.component.html',
  styleUrls: ['./pointlist.component.css']
})
export class PointlistComponent implements OnInit {

  constructor(public road:RoadmapService) { }
  @Output() startEdit = new EventEmitter()

  ngOnInit(): void {

  }

  hide(pointId:number){
    this.road.changePointStatus(pointId,'hidden')
  }

  show(pointId:number){
    this.road.changePointStatus(pointId,'shown')
  }

  editPoint(point:Object){
    this.road.selectedPoint=point;
    this.startEdit.emit()
  }
}
