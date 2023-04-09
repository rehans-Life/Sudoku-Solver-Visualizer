export function isValid(num, r, c, board) {
  for (let i = 0; i < 9; i++) {
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
