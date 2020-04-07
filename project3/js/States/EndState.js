class EndState {
  constructor() {

  }
  draw(winlose) {
    // if win, show victory message; if lose show lose message; button to return to menu and play again
    if (winlose === "win") {
      console.log("win");
    } else if (winlose === "lose") {
      console.log("lose");
    } else {
      console.log("error");
    }
  }
}
