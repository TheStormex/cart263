class EndState {
  constructor() {

  }
  draw() {
    // if win, show victory message; if lose show lose message; button to return to menu and play again
    if (winLose === "win") {
      console.log("win");
    } else if (winLose === "lose") {
      console.log("lose");
    } else {
      console.log("error");
    }
  }
  mouseDown() {

  }
  keyDown() {

  }
}
