import { CellComponent } from './../cell/cell.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-maze',
  templateUrl: './maze.component.html',
  styleUrls: ['./maze.component.scss']
})
export class MazeComponent implements OnInit {

  public maze: CellComponent[][];

  width = 69;
  height = 27;

  startingPos: [number, number] = [Math.floor(this.height / 2), Math.floor(this.width / 3)];
  endingPos: [number, number] = [Math.floor(this.height / 2), Math.floor(this.width * 2 / 3)];

  constructor() {
    this.maze = [];
    for (let i = 0; i < this.height; i++) {
      this.maze[i] = [];
      for (let j = 0; j < this.width; j++) {
        this.maze[i][j] = new CellComponent();
      }
    }
    this.maze[this.startingPos[0]][this.startingPos[1]].changeStateToStartingPos();
    this.maze[this.endingPos[0]][this.endingPos[1]].changeStateToEndingPos();
  }

  ngOnInit(): void {
  }

  changeCellState(height: number, width: number, toWall) {
    if (toWall) {
      this.maze[height][width].changeStateToWall();
    } else {
      this.maze[height][width].changeStateToNothing();
    }
  }

  getAllNothingAdjacentCells(i: number, j: number) {
    var arr = [];
    if (i > 0 && this.maze[i - 1][j].checkIfNothingOrEnding()) {
      arr.push([this.maze[i - 1][j], i - 1, j]);
      this.maze[i - 1][j].changeStateToDiscovered();
    }
    if (i + 1 < this.height && this.maze[i + 1][j].checkIfNothingOrEnding()) {
      arr.push([this.maze[i + 1][j], i + 1, j]);
      this.maze[i + 1][j].changeStateToDiscovered();
    }
    if (j > 0 && this.maze[i][j - 1].checkIfNothingOrEnding()) {
      arr.push([this.maze[i][j - 1], i, j - 1]);
      this.maze[i][j - 1].changeStateToDiscovered();
    }
    if (j + 1 < this.width && this.maze[i][j + 1].checkIfNothingOrEnding()) {
      arr.push([this.maze[i][j + 1], i, j + 1]);
      this.maze[i][j + 1].changeStateToDiscovered();
    }
    console.log('arr', arr);
    return arr;
  }

  BFS() {
    var q = [];
    var v: [CellComponent, number, number];
    q.push([this.maze[this.startingPos[0]][this.startingPos[1]], this.startingPos[0], this.startingPos[1]]);
    while (q.length) {
        v = q.shift();
        console.log(v);
        if (v[0].checkIfEndingPos()) {
          return v;
        } else {
          let arr = this.getAllNothingAdjacentCells(v[1], v[2]);
          for (var c of arr) {
            console.log('c:', c);
            q.push(c);
          }
          console.log('q:', q);
        }
    }
  }
}
