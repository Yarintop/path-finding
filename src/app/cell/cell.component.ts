import { State } from './state-enum';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {
  StateEnum = State;
  state: Number;
  color: String = "";
  text: String = "";

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
    this.color = "";
    this.text = "";
  }

  changeStateToWall() {
    this.state = State.WALL;
    this.color = "purple";
    this.text = "";
  }

  changeStateToStartingPos() {
    this.state = State.STARTING_POS;
    this.color = "red";
    this.text = "Start";
  }

  changeStateToEndingPos() {
    this.state = State.ENDING_POS;
    this.color = "red";
    this.text = "End";
  }

  changeStateToDiscovered() {
    this.state = State.DISCOVERED;
    this.color = "orange";
    this.text = "";
  }

  checkFreePath() {
    if (this.state === 0) {
      this.changeStateToDiscovered();
      return true;
    }
    return this.state === 3;
  }
  
  checkIfWall() {
    return this.state === 1;
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

  getColor() {
    return this.color;
  }

  getText() {
    return this.text;
  }
}
