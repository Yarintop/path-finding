import { State } from './state-enum';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {
  StateEnum = State;
  state: Number;

  constructor() { 
     this.state = State.NOTHING;
  }

  ngOnInit(): void {
  }

  changeStateToNothing() {
    this.state = State.NOTHING;
  }

  changeStateToWall() {
    this.state = State.WALL;
  }

  getState() {
    return this.state;
  }
}
