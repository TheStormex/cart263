class Jobs {
  constructor(input, index) {
    console.log(input);
    this.name = input[0];
    this.availability = input[1];
    this.salary = input[2];
    $("#jobsDiv").append(`<div class='option' id='job${index}'> <span class='jobName'> ${this.name} </span> | Availability: <span class='availabilityLeft'> ${this.availability} </span> | Salary: <span> ${this.salary} </span> <button onclick='workButtonPressed(${index})'> Work </button>`);
    this.timer = setInterval(this.countdown, 1000);
    this.id = "#job"+index;
  }

  countdown() {
    this.availability-=1;
    $(this.id).find(".availabilityLeft").html(this.availability);
  }

  work() {

  }


}
