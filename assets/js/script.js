
$(document).ready(function () {
  //DEPENDENCIES =======================================================================
  var dateEl = $('#currentDay');
  var timeBlockEl = $('.time-block');
  var buttonEl = $('.fa-save');

  //DATA ===============================================================================
  var currentDate = dayjs();
  var dateFormatted = currentDate.format('dddd, MMMM D');
  formatDate();//correct the dateFormatted data by adding a 'st' 'nd' 'rd' or 'th' at the end
  var currentHour = currentDate.hour();
  

  //FUNCTIONS ==========================================================================

  //format the date so that it matches the mock up
  function formatDate(){
    if(currentDate.date() === 1){
      dateFormatted += 'st';
    }
    else if(currentDate.date() === 2){
      dateFormatted += 'nd';
    }
    else if(currentDate.date() === 3){
      dateFormatted += 'rd';
    }
    else{
      dateFormatted += 'th';
    }
  }
  //will apply the color background to the scheduler rows based on the current hour 
  function applyColorStyle(){
    timeBlockEl.each(function () {
      
      var blockHour = this.getAttribute('id');
      blockHour = blockHour.substring(5);
      blockHour = parseInt(blockHour);

      if(currentHour > blockHour){
        this.setAttribute('class', 'row time-block past');
      } 
      else if(currentHour === blockHour){
        this.setAttribute('class', 'row time-block present');
      }
      else{
        this.setAttribute('class', 'row time-block future');
      }


    });
  }

  function saveButtonListener(event){
      event.preventDefault();

      var parentId = $(event.target).parent().parent().attr('id');
      var textContent;

      console.log(parentId);
  }

  //USER INTERACTIONS ==================================================================
  //user can see the current date at the header 
  dateEl.text(dateFormatted);
  //user can see a color pattern on the scheduler based on the current time 
  applyColorStyle();
  //user can input text into the scheduler and click save which will save the text into the local storage
  buttonEl.each(function (){
    addEventListener('click', saveButtonListener);
  });


  //INITIALIZATIONS ====================================================================









  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});
