import React from "react";
import styles from "../styles/Home.module.css";

export default function Cell({ number, isFilled, isSolved, col }) {
  return (
    <div
      className={`${
        isFilled ? styles.filled : isSolved ? styles.solved : ""
      }  ${styles.cell} ${col != 0 && col % 3 == 0 && styles.cellCross}`}
    >
      {number !== 0 && number}
    </div>
  );
}
