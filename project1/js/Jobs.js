class Jobs {
  constructor(input, index) {
    this.index = index;
    this.name = input[0];
    this.availability = input[1];
    this.salary = input[2];
    // Make the job div appear
    $("#jobsDiv").append(`<div class='option' id='job${this.index}'> <span class='jobName'> ${this.name} </span> | Availability: <span id='availabilityLeft${this.index}'> ${this.availability} </span> | Salary: <span> ${this.salary} </span> <button id='workButton${this.index}' class='workButton'> Work </button>`);
    this.id = "#job"+index;
  }
}
