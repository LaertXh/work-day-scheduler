
$(document).ready(function () {
  //DEPENDENCIES =======================================================================
  var dateEl = $('#currentDay');
  var timeBlockEl = $('.time-block');
  var buttonEl = $('.btn');

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

      //get contents from local storage and place them in the appropriate rows
      $(this).contents('.description').val(localStorage.getItem($(this).attr('id')));


    });
  }

  function saveButtonListener(event){
      event.preventDefault();
      var textArea = $(event.currentTarget).parent().contents('.description').val();
      var parentId = $(event.currentTarget).parent().attr('id');


    localStorage.setItem(parentId, textArea);
  }


  //USER INTERACTIONS ==================================================================
  //user can see the current date at the header 
  dateEl.text(dateFormatted);
  //user can see a color pattern on the scheduler based on the current time 
  applyColorStyle();
  //user can input text into the scheduler and click save which will save the text into the local storage
  buttonEl.on('click', saveButtonListener);
  //when user reloads the page local storage data is applied to elements -- done at the end of applyColorStyles function



  //INITIALIZATIONS ====================================================================

});
