//Anette og Julians Seje Quiz (og Anders)

//Dots
const stepBtns = document.getElementById("step-btn");

const dot = document.getElementsByClassName("step-dot");
const slide = document.getElementsByClassName("form-row");

//Buttons
const startBtn = document.getElementById("btn-start");
const backBtn = document.getElementById("btn-back");
const nextBtn = document.getElementById("btn-next");

let activeSlideNumber = 0;

function startQuiz() {
  activeSlideNumber = 0;
  navigateForward();

  startBtn.style.display = "none";
  stepBtns.style.display = "flex";
  //Starts Countdown
  var minutesLabel = document.getElementById("minutes");
  var secondsLabel = document.getElementById("seconds");
  var totalSeconds = 0;
  setInterval(setTime, 1000);

  function setTime() {
    ++totalSeconds;
    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
  }

  function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
      return "0" + valString;
    } else {
      return valString;
    }
  }
}

function restartQuiz() {
  // Clean up dots
  for (let i = 0; i < dot.length; i++) {
    dot[i].classList.remove("dot-active");
  }
  // Reset slides
  slide[activeSlideNumber].classList.toggle("form-row-active");
  slide[0].classList.toggle("form-row-active");

  // Reset buttons
  nextBtn.innerText = "Næste";
  backBtn.classList.toggle("btn-inactive");
  // ... and start quiz again
  startQuiz();
}

// THIS NEEDS TO WORK!
/*
const true = 

const qOne = document.querySelector('input[name="datatilsynet"]:checked').value;
if (qOne = "true") {
    document.getElementById("q1").innerText = "Korrekt svaret!";
} if (qOne = "false") {
    document.getElementById("q1").style.color = "red";
    document.getElementById("q1").innerText = "Forkert svaret!";
} */

//NEW TRY! ONLY WORKS ON THE FIRST RADIO BUTTON - ALERTS
/* const radioData = document.getElementsByName("datatilsynet");

for (const i = 0, length = radioData.length; i < length; i++) {
    if (radioData[i].checked) {
        alert(radioData[i].value);
        break;
    }
} */

function navigateForward() {
  activeSlideNumber++;
  showActiveSlide(true);
}

function navigateBackward() {
  activeSlideNumber--;
  showActiveSlide(false);
}

function dotChangeNext() {
  navigateForward();

  // Prints value from input when pressed
  //const aOne = document.querySelector('input[name="datatilsynet"]:checked').value;
  //console.log(aOne);
  //document.getElementById("a1").innerText = aOne;
  //alert(aOne);
}

function dotChangeBack() {
  navigateBackward();
}

function showActiveSlide(isMoveForward) {
  if (isMoveForward) {
    // Disable previous slide and enable active slide
    slide[activeSlideNumber - 1].classList.toggle("form-row-active");
    slide[activeSlideNumber].classList.toggle("form-row-active");

    if (activeSlideNumber == 2) {
      backBtn.classList.toggle("btn-inactive");
    } else if (activeSlideNumber == 8) {
      nextBtn.innerText = "Afslut quizzen";
    } else if (activeSlideNumber == 9) {
      stepBtns.style.display = "none";
    }

    // Only update dots on slide 1-8
    if (activeSlideNumber - 1 < dot.length) {
      dot[activeSlideNumber - 1].classList.toggle("dot-active");
    }
  } else {
    // Disable previous slide and enable active slide
    slide[activeSlideNumber].classList.toggle("form-row-active");
    slide[activeSlideNumber + 1].classList.toggle("form-row-active");

    if (activeSlideNumber == 1) {
      backBtn.classList.toggle("btn-inactive");
    } else if (activeSlideNumber == 7) {
      nextBtn.innerText = "Næste";
    }

    if (activeSlideNumber - 1 < dot.length) {
      dot[activeSlideNumber].classList.toggle("dot-active");
    }
  }
}

//Info boks popup
function infoPopup() {
  const popup = document.getElementById("info-popuptext");
  popup.classList.toggle("info-show");
}

//Cookie popup

// Get the modal
const cookieModal = document.getElementById("cookie-popup");

function closeCookiePopup() {
  cookieModal.style.display = "none";
}

//Report popup

// Get the modal
const reportModal = document.getElementById("report-popup");
const reportOpenBtn = document.getElementById("report-btn");
const span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
reportOpenBtn.onclick = function () {
  reportModal.style.display = "block";
};

span.onclick = function () {
  reportModal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == reportModal) {
    reportModal.style.display = "none";
  }
};

/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
