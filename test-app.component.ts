import { Component, OnInit, ViewChild } from '@angular/core';
import { BinsComponent, Bin } from './bins.component';
declare var module:any;

var testData: Bin[]  =  [
  {index: 0, stat: 1},
  {index: 33, stat: 10},
  {index: 9, stat: 2},
  {index: 8, stat: 10},
  {index: 6, stat: 3},
  {index: 11, stat: 10},
  {index: 22, stat: 4},
]

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'test-app.component.html',
  styleUrls: ['test-app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild(BinsComponent) bins:BinsComponent;
  selected: Bin;

  ngOnInit() {
    this.bins.bins = testData
  }
}
