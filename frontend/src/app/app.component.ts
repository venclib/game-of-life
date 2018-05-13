import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { ApiService } from './shared/services/api.service';
import { Observable, Subscription } from 'rxjs/Rx';
import { ISavedPatternResult, INewPattern, ISavedPatternList, IGroupedPattern } from './shared/interfaces/IPattern';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';

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
  public boardSize: number = 30;
  public patterns: IGroupedPattern[];
  public selectedPattern: ISavedPatternList;
  public savedPatternName: string;

  constructor(private apiService: ApiService, public dialog: MatDialog, public snackBar: MatSnackBar){
    
  }

  ngOnInit() {
    this.createBoard();
    this.getPatterns();
  }

  private createBoard(): void {
    this.board = [];
    for (let i = 0; i < this.boardSize; i++){
      var row = [];
      for (let j = 0; j < this.boardSize; j++){
        row.push(false);
      }
      this.board.push(row);
    }
  }

  public resizeBoard(value: number): void {
    this.boardSize = value;
    this.createBoard();
  }

  public click (rowIndex: number, columnIndex: number): void {
    this.stepCount = 0;
    this.board[rowIndex][columnIndex]= !this.board[rowIndex][columnIndex];
  }

  public getNextGeneration(): void {
    this.apiService.getNextState(this.board)
      .subscribe((resp: boolean[][]) => 
          { 
            this.board = resp;
            this.stepCount++;
           }
      );
  }

  public autoPlay(): void {
    this.isRunning = true;

    let oneSecondInMiliseconds = 500;
    this.interval = Observable.interval(oneSecondInMiliseconds).subscribe(x => {
      this.getNextGeneration();
    });
  }

  public stopPlay(): void {
    if (this.interval) {
      this.isRunning = false;
      this.interval.unsubscribe();
    }
  }

  public getPatterns(): void {
    this.apiService.getPatternNames().subscribe((resp: ISavedPatternList[]) => { 
          var fromFile = {
            groupName: 'From file',
            patterns: []
          };
          var fromDB = {
            groupName: 'From database',
            patterns: []
          }
          resp.forEach((item) => {
            if (item.id) {
              fromDB.patterns.push(item);
            } else {
              fromFile.patterns.push(item);
            }
          })
          this.patterns = [
            fromFile, fromDB
          ];

        }
      );
  }

  public selectPattern(): void  {
    this.apiService.getPatternByName(this.selectedPattern.name, this.selectedPattern.id)
      .subscribe((pattern: ISavedPatternResult) => { 
          this.boardSize = pattern.boardSize;
          this.createBoard();
          for (let state of pattern.board) {
            this.board[state.column][state.row] = true;
          }
      });
  }

  public savePatternDialog(): void {
    let dialogRef = this.dialog.open(PatternSaveDialog, {
      width: '250px',
      data: { name: this.savedPatternName}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.apiService.savePattern({name: result, data: this.board}).subscribe((pattern: INewPattern) => {
          this.openSnackBar('Pattern save succesfull', 'OK');
          this.getPatterns();
        }, err => {
          this.openSnackBar('Pattern save failed', 'OK');
        });
      }
    });
  }

  private openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  ngOnDestroy() {
    this.stopPlay();
  }
}

@Component({
  selector: 'pattern-save-dialog',
  templateUrl: 'pattern-save-dialog.html',
})
export class PatternSaveDialog {

  constructor(
    public dialogRef: MatDialogRef<PatternSaveDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
