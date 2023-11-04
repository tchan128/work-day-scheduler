var hourPrefixId = "#hour-";
var hourPrefixClass = "hour-"

$(function () {

  $("#currentDay").text(dayjs().format("dddd, MMMM D"));

  for (var i = 9; i < 18; i++) {
    var hourBlock = hourPrefixId + i.toString();
    var hour = Number((hourBlock.split("-"))[1])
    if (hour < Number(dayjs().format("H"))) {
      $(hourBlock).removeClass("past present future");
      $(hourBlock).addClass("past");
      $("textarea").prop("disabled", true);
    } else if (hour === Number(dayjs().format("H"))) {
      $(hourBlock).removeClass("past present future");
      $(hourBlock).addClass("present");
      $("textarea").prop("disabled", false);
    } else if (hour > Number(dayjs().format("H"))) {
      $(hourBlock).removeClass("past present future");
      $(hourBlock).addClass("future");
      $("textarea").prop("disabled", false);
    }
  };

  $(document).ready(function(){
    $('.saveBtn').click(function(event){
      var hourId = event.target.id;
      console.log(hourId);
      var userInput = $(`.${hourId}`).val();
      localStorage.setItem(`${hourId}-event`, userInput);
      $(".confirmation").text(`New event: ${userInput} saved to LocalStorage`);
    })});

  for (var i = 9; i < 18; i++) {
    var hourBlock = hourPrefixClass + i.toString();
    // var hour = (hourBlock.split("-"))[1]
    var hourEvent = localStorage.getItem(`${hourBlock}-event`);
    $(`.${hourBlock}`).text(hourEvent);
  };

  if (dayjs().format("HH:mm") === "00:00") {
    localStorage.clear();
  }
});
