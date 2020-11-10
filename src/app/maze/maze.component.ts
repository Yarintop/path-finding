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
    console.log(this.startingPos);
    this.maze[this.startingPos[0]][this.startingPos[1]].changeStateToWall();
    this.maze[this.endingPos[0]][this.endingPos[1]].changeStateToWall();

  }

  ngOnInit(): void {
  }

}
