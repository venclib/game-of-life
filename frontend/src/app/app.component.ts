import { Component } from '@angular/core';
import { ApiService } from './shared/services/api.service';
import { Observable, Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public board: boolean[][] = [] ;
  public interval: Subscription;
  public isRunning: boolean = false;
  public stepCount: number = 0;

  constructor(private apiService: ApiService){
    let initBoardSize = 10;
    this.createBoard(initBoardSize);
  }

  private createBoard(boardSize: number) {
    this.board = [];
    for (let i = 0; i < boardSize; i++){
      var row = [];
      for (let j = 0; j < boardSize; j++){
        row.push(false);
      }
      this.board.push(row);
    }
  }

  public resizeBoard(event: any) {
    if (event && event.value) {
      this.createBoard(event.value);
    }
  }

  public click (rowIndex, columnIndex) {
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
    this.getNextGeneration();

    let oneSecondInMiliseconds = 1000;
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

  ngOnDestroy() {
    this.stopPlay();
  }
}
