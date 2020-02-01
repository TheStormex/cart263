class Dues {
  constructor(input, index) {
    this.index = index;
    this.name = input[0];
    this.timeLimit = input[1];
    this.totalCost = input[2];
    // if this due is not paid yet, it is 'there'. When it is paid, it is no longer there
    this.there = true;
    // Make the dues div appear
    $("#duesDiv").append(`<div class='option' id='due${this.index}'> <span class='dueName'> ${this.name} </span> | Time Limit: <span id='timeLimitLeft${this.index}'> ${this.timeLimit} </span> | Total Cost: <span> ${this.totalCost} </span> <button id='payButton${this.index}'> Pay </button>`);
    this.id = "#due"+index;
  }
}
