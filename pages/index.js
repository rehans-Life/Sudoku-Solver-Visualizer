import Head from "next/head";
import styles from "../styles/Home.module.css";
import { copy, isValid, sudoku_solver } from "../algorithm";
import { useState } from "react";
import Cell from "../components/Cell";
import Header from "../components/Header";

export class Piece {
  constructor(val, isFilled = false, isSolved = false) {
    this.val = val;
    this.isFilled = isFilled;
    this.isSolved = isSolved;
  }
}

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
    let isSolved = sudoku_solver(copy(boardCopy), animations);
    if (isSolved) {
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
    } else {
      console.log("Cannot Be Solved");
    }
  }, 2000);
}

export default function Home() {
  const [board, setBoard] = useState(initialBoard());
  const [disabled, setDisabled] = useState(false);
  const [message, setMessage] = useState(
    "Load the Sudoku Board in order to Solve it."
  );

  return (
    <div className={styles.container}>
      <Head>
        <title>Sudoku Solver</title>
        <meta name="description" content="A Sudoku Solver Visualizer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header
        board={board}
        setBoard={setBoard}
        disabled={disabled}
        setDisabled={setDisabled}
        setMessage={setMessage}
      />
      <p
        className={`${message.includes("Operations") && styles.solvedMsg}  ${
          disabled && styles.solving
        } ${styles.message}`}
      >
        {disabled ? "Your Sudoku Board is Being Solved...." : message}
      </p>
      <div className={styles.wrapper}>
        <div className={styles.board}>
          {board.map((row, index) => (
            <div
              key={index}
              className={`${index !== 0 && index % 3 == 0 && styles.cross} ${
                styles.row
              }`}
            >
              {row.map(({ val, isFilled, isSolved }, index) => (
                <Cell
                  key={index}
                  number={val}
                  col={index}
                  isFilled={isFilled}
                  isSolved={isSolved}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
