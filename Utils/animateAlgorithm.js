import { sudoku_solver } from "../Utils/algorithm";
import { copy } from "../Utils/copy";
import { Piece } from "../pages";

export function solve_sudoku(board, setBoard, setDisabled, setMessage) {
  let animations = [];
  let boardCopy = [];
  for (let i = 0; i < board.length; i++) {
    let row = [];
    for (let j = 0; j < board[i].length; j++) {
      let cell = board[i][j];
      if (cell.isSolved) {
        row.push(new Piece(0));
      } else {
        row.push(new Piece(cell.val, cell.isFilled, cell.isSolved));
      }
    }
    boardCopy.push(row);
  }
  setBoard(boardCopy);
  setTimeout(() => {
    sudoku_solver(copy(boardCopy), animations);
    for (
      let i = Math.floor(animations.length / 2);
      i < animations.length;
      i++
    ) {
      setTimeout(() => {
        if (i === animations.length - 1) {
          setMessage(
            `Your Sudoku Board was Solved in ${animations.length} Operations :)`
          );
          setDisabled(false);
        }
        let newBoard = animations[i];
        setBoard(newBoard);
      }, 100);
    }
  }, 2000);
}
