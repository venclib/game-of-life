export interface ISavedPatternResult {
  boardSize: number,
  board: ILiveCellCoordinates[]
}

export interface IGroupedPattern {
  groupName: string,
  patterns: ISavedPatternList[]
}

export interface ILiveCellCoordinates {
  column: number,
  row: number
}

export interface ISavedPatternList {
  name: string,
  id?: string 
} 

export interface INewPattern {
    name: string
    data: boolean[][]
}