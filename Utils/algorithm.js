import { copy } from "./copy";
import { isValid } from "./isValid";
import { Piece } from "../pages";

export function sudoku_solver(board, animations) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j].val === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isValid(num, i, j, board)) {
            board[i][j] = new Piece(num, false, true);
            animations.push(copy(board));
            if (sudoku_solver(board, animations)) {
              return true;
            } else {
              board[i][j] = new Piece(0, false, false);
            }
          }
        }
        return false;
      }
    }
  }
  return true;
}
