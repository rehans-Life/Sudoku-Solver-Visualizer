import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import Cell from "../components/Cell";
import Header from "../components/Header";
import { initialBoard } from "../Utils/boards";

export class Piece {
  constructor(val, isFilled = false, isSolved = false) {
    this.val = val;
    this.isFilled = isFilled;
    this.isSolved = isSolved;
  }
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
        <link rel="icon" href="/sudoku.png" />
      </Head>
      <Header
        board={board}
        setBoard={setBoard}
        disabled={disabled}
        setDisabled={setDisabled}
        setMessage={setMessage}
      />
      <p
        className={`${
          message.includes("Operations")
            ? styles.solvedMsg
            : disabled
            ? styles.solving
            : ""
        }  
          
         ${styles.message}`}
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
