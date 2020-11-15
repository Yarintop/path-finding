import { CellComponent } from './../cell/cell.component';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { state, style, trigger, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-maze',
  templateUrl: './maze.component.html',
  styleUrls: ['./maze.component.scss'],
  animations: [
    trigger('changeColor', [
      state('0', style({                    //Nothing
        backgroundColor: ""
      })),
      state('1', style({                    //Wall
        backgroundColor: "Purple"
      })),
      state('2', style({                    //Starting Position
        backgroundColor: "Red"
      })),
      state('3', style({                    //Ending Position
        backgroundColor: "Red"
      })),
      state('4', style({                    //Discovered
        backgroundColor: "Orange"
      })),
      transition(':enter, * => 2, * => 3', [
        animate('.1s')
      ]),
      transition('* => *', animate('.2s {{delayLayer}}ms ease'), { params: { delayLayer: 0 } }),
      // transition('* => *', [
      //   animate('.5s')
      // ]),
    ]),
  ],
})
export class MazeComponent implements OnInit {

  public maze: CellComponent[][];

  width = 69;
  height = 27;

  startingPos: [number, number] = [Math.floor(this.height / 2), Math.floor(this.width / 3)];
  endingPos: [number, number] = [Math.floor(this.height / 2), Math.floor(this.width * 2 / 3)];

  constructor(private cdr: ChangeDetectorRef) {
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

  changeCellState(height: number, width: number) {
    if (!this.maze[height][width].checkIfWall()) {
      this.maze[height][width].changeStateToWall();
    } else {
      this.maze[height][width].changeStateToNothing();
    }
  }

  // changeCellState(height: number, width: number, toWall) {
  //   if (toWall) {
  //     this.maze[height][width].changeStateToWall();
  //   } else {
  //     this.maze[height][width].changeStateToNothing();
  //   }
  // }

  start() {
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        if (this.maze[i][j].checkIfDiscovered()) {
          this.maze[i][j].changeStateToNothing();
        }
      }
    }
    this.BFS();
  }

  getAllNothingAdjacentCells(i: number, j: number) {
    var arr = [];
    if (i > 0 && this.maze[i - 1][j].checkFreePath()) {
      arr.push([this.maze[i - 1][j], i - 1, j]);
    }
    if (i + 1 < this.height && this.maze[i + 1][j].checkFreePath()) {
      arr.push([this.maze[i + 1][j], i + 1, j]);
    }
    if (j > 0 && this.maze[i][j - 1].checkFreePath()) {
      arr.push([this.maze[i][j - 1], i, j - 1]);
    }
    if (j + 1 < this.width && this.maze[i][j + 1].checkFreePath()) {
      arr.push([this.maze[i][j + 1], i, j + 1]);
    }
    return arr;
  }

  BFS() {
    var q = [];
    var v: [CellComponent, number, number];
    var lastV;
    q.push([this.maze[this.startingPos[0]][this.startingPos[1]], this.startingPos[0], this.startingPos[1]]);
    var intervalId = setInterval(() => {
      lastV = q[q.length - 1];
      while (q.includes(lastV)) {
        v = q.shift();
        let arr = this.getAllNothingAdjacentCells(v[1], v[2]);
        for (var c of arr) {
          if (c[0].checkIfEndingPos()){
            clearInterval(intervalId);
          }
          q.push(c);
        }
      }
    }, 1);
  }
}
