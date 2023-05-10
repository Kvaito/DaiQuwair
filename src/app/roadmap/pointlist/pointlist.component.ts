import { Component, OnInit } from '@angular/core';
import {RoadmapService} from "../../services/roadmap.service";

@Component({
  selector: 'app-pointlist',
  templateUrl: './pointlist.component.html',
  styleUrls: ['./pointlist.component.css']
})
export class PointlistComponent implements OnInit {

  constructor(public road:RoadmapService) { }


  ngOnInit(): void {

  }


}
