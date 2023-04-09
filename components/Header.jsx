import React from "react";
import styles from "../styles/Header.module.css";
import { initialBoard, loadBoard, solve_sudoku } from "../pages";

export default function Header({
  board,
  setBoard,
  disabled,
  setDisabled,
  setMessage,
}) {
  return (
    <div className={styles.container}>
      <h1>Sudoku Solver Visualizer</h1>
      <div className={styles.btns}>
        <button
          disabled={disabled}
          onClick={() => {
            setDisabled(true);
            solve_sudoku(board, setBoard, setDisabled, setMessage);
          }}
          className={styles.btn}
        >
          Solve Sudoku
        </button>
        <button
          disabled={disabled}
          onClick={() => {
            setMessage("Your Sudoku Board is ready to be Solved.");
            setBoard(() => loadBoard());
          }}
          className={styles.btn}
        >
          Load Board
        </button>
        <button
          disabled={disabled}
          onClick={() => {
            setMessage("Load the Sudoku Board in order to Solve it.");
            setBoard(initialBoard());
          }}
          className={styles.btn}
        >
          Refresh Board
        </button>
      </div>
    </div>
  );
}
