class TitleState {
  constructor() {

  }
  draw() {
    // draw title, play button, images of players and enemies
    push();
    noStroke();
    fill(255);
    textSize(width/30+height/30);
    textAlign(CENTER, CENTER);
    text("The Last Hacktivists", width/2, height/5);
    rectMode(CENTER, CENTER);
    rect(width/2, height-height/5, width/5, height/10);
    fill(0);
    text("Play", width/2, height-height/5)
    pop();
  }
  mousePressed() {
  }
}
