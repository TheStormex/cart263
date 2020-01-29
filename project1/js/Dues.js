class Dues {
  constructor(input, index) {
    console.log(input);
    this.name = input[0];
    this.timeLimit = input[1];
    this.totalCost = input[2];
    $("#duesDiv").append(`<div class='option' id='due${index}'> <span class='dueName'> ${this.name} </span> | Time Limit: <span class='timeLimitLeft'> ${this.timeLimit} </span> | Total Cost: <span> ${this.totalCost} </span> <button onclick='payButtonPressed(${index})'> Pay </button>`);
    this.timer = setInterval(this.countdown, 1000);
    this.id = "#due"+index;
  }

  countdown() {
    this.timeLimit-=1;
    $(this.id).find(".timeLimitLeft").html(this.timeLimit);
  }

  pay() {

  }


}
