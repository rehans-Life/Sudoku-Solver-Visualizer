import { Piece } from "../pages";

export function copy(board) {
  let boardCopy = [];
  for (let i = 0; i < board.length; i++) {
    let row = [];
    for (let j = 0; j < board[i].length; j++) {
      let cell = board[i][j];
      row.push(new Piece(cell.val, cell.isFilled, cell.isSolved));
    }
    boardCopy.push(row);
  }
  return boardCopy;
}
