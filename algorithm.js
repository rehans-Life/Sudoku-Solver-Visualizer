import { Piece } from "./pages";

export function isValid(num, r, c, board) {
  for (let i = 0; i < 9; i++) {
    // We check all other cells of the row.
    if (board[r][i].val === num) {
      return false;
    }

    if (board[i][c].val === num) {
      return false;
    }

    if (
      board[3 * Math.floor(r / 3) + Math.floor(i / 3)][
        3 * Math.floor(c / 3) + Math.floor(i % 3)
      ].val === num
    ) {
      return false;
    }
  }
  return true;
}

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
