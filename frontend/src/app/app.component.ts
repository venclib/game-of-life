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

  constructor(private apiService: ApiService){
    this.initBoard();
  }

  private initBoard() {
    let boardSize = 10;
    for (let i = 0; i < boardSize; i++){
      var row = [];
      for (let j = 0; j < boardSize; j++){
        row.push(false);
      }
      this.board.push(row);
    }
  }

  public click (rowIndex, columnIndex) {
    this.board[rowIndex][columnIndex]= !this.board[rowIndex][columnIndex];
  }

  public getNextGeneration() {
    this.apiService.getNextState(this.board)
      .subscribe((resp: boolean[][]) => 
          { this.board = resp}
      );
  }

  public autoPlay() {
    this.isRunning = true;
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
