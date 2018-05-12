import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from './shared/services/api.service';
import { Observable, Subscription } from 'rxjs/Rx';
import { IPattern } from './shared/interfaces/IPattern';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {
  public board: boolean[][] = [] ;
  public interval: Subscription;
  public isRunning: boolean = false;
  public stepCount: number = 0;
  public boardSize: number = 80;
  public patterns: string[];
  public selectedPattern: string;

  constructor(private apiService: ApiService){
    
  }

  ngOnInit() {
    this.createBoard();
    this.getPatterns();
  }

  private createBoard() {
    this.board = [];
    for (let i = 0; i < this.boardSize; i++){
      var row = [];
      for (let j = 0; j < this.boardSize; j++){
        row.push(false);
      }
      this.board.push(row);
    }
  }

  public resizeBoard(value: number) {
    this.boardSize = value;
    this.createBoard();
  }

  public click (rowIndex, columnIndex) {
    this.stepCount = 0;
    this.board[rowIndex][columnIndex]= !this.board[rowIndex][columnIndex];
  }

  public getNextGeneration() {
    this.apiService.getNextState(this.board)
      .subscribe((resp: boolean[][]) => 
          { 
            this.board = resp;
            this.stepCount++;
           }
      );
  }

  public autoPlay() {
    this.isRunning = true;

    let oneSecondInMiliseconds = 100;
    this.interval = Observable.interval(oneSecondInMiliseconds).subscribe(x => {
      this.getNextGeneration();
    });
  }

  public stopPlay() {
    if (this.interval) {
      this.isRunning = false;
      this.interval.unsubscribe();
    }
  }

  public getPatterns() {
    this.apiService.getPatternNames().subscribe((resp: string[]) => { 
          this.patterns = resp;
        }
      );
  }

  public selectPattern() {
    this.apiService.getPatternByName(this.selectedPattern).subscribe((pattern: IPattern[]) => { 
          this.boardSize = 80;
          this.createBoard();
          for (let state of pattern) {
            this.board[state.column][state.row] = true;
          }
      });
  }

  ngOnDestroy() {
    this.stopPlay();
  }
}
