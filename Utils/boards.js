import { isValid } from "../Utils/isValid";
import { Piece } from "../pages";

export function initialBoard() {
  let board = [];
  for (let i = 0; i < 9; i++) {
    let row = [];
    for (let j = 0; j < 9; j++) {
      row.push(new Piece(0));
    }
    board.push(row);
  }
  return board;
}

export function loadBoard() {
  let board = initialBoard();

  let a = 30;

  while (a--) {
    let i = Math.floor(Math.random() * 9);
    let j = Math.floor(Math.random() * 9);
    let val = Math.floor(Math.random() * 9) + 1;

    if (isValid(val, i, j, board)) {
      board[i][j] = new Piece(val, true, false);
    }
  }
  return board;
}
