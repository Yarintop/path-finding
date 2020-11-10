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

  changeState(i: number) {
    if (i <= 4 && i >= 0 && i % 1 === 0) {
      this.state = i;
    }
  }

  changeStateToNothing() {
    this.state = State.NOTHING;
  }

  changeStateToWall() {
    this.state = State.WALL;
  }

  changeStateToStartingPos() {
    this.state = State.STARTING_POS;
  }

  changeStateToEndingPos() {
    this.state = State.ENDING_POS;
  }

  changeStateToDiscovered() {
    this.state = State.DISCOVERED;
  }

  checkIfNothingOrEnding() {
    return this.checkIfNothing() || this.checkIfEndingPos();
  }

  checkIfNothing() {
    return this.state === 0;
  }

  checkIfEndingPos() {
    return this.state === 3;
  }

  checkIfDiscovered() {
    return this.state === 4;
  }

  getState() {
    return this.state;
  }
}
