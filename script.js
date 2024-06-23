//Anette, Maya og Julians Seje Quiz (og lidt Anders)

//Dots
const stepBtns = document.getElementById("step-btns");

const dots = document.getElementsByClassName("step-box__dot");
const slides = document.getElementsByClassName("form-row");

//Buttons
const startBtn = document.getElementById("btn-start");
const againBtn = document.getElementById("btn-tryagain");
const backBtn = document.getElementById("btn-back");
const nextBtn = document.getElementById("btn-next");

//Img
const thumbsbUpImg = document.getElementById("thumbsUpImg");
const thumbsDownImg = document.getElementById("thumbsDownImg");

let activeSlideNumber = 0;
let hasTimerBeenStarted = false;

function startQuiz() {
  activeSlideNumber = 0;
  navigateForward();

  startBtn.style.display = "none";
  stepBtns.style.display = "flex";
  nextBtn.disabled = true;

  //Starts timer - removed
  //startTimer()
}

function isAnswerSelected() {
  const currentSlide = slides[activeSlideNumber];
  const radioButtons = currentSlide.querySelectorAll('input[type="radio"]');
  for (let i = 0; i < radioButtons.length; i++) {
    if (radioButtons[i].checked) {
      return true;
    }
  }
  return false;
}

// Timer as function
function startTimer() {
  if (hasTimerBeenStarted) {
    return;
  }

  var minutesLabel = document.getElementById("minutes");
  var secondsLabel = document.getElementById("seconds");
  var totalSeconds = 0;
  setInterval(setTime, 1000);
  hasTimerBeenStarted = true;

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
  for (let dot of dots) {
    dot.classList.remove("dot-active");
  }
  // Reset slides
  slides[activeSlideNumber].classList.toggle("form-row-active");
  slides[0].classList.toggle("form-row-active");

  // Reset thumbImg
  thumbsbUpImg.style.display = "none";
  thumbsDownImg.style.display = "none";

  // Reset buttons
  nextBtn.innerText = "Næste";
  againBtn.style.display = "none";

  // Reset radio buttons
  const radioButtons = document.querySelectorAll('input[type="radio"]');
  for (let i = 0; i < radioButtons.length; i++) {
    radioButtons[i].checked = false;
  }

  // Disable the "Next" button
  nextBtn.disabled = true;

  // ... and start quiz again
  startQuiz();
}

function navigateForward() {
  activeSlideNumber++;
  showActiveSlide(true);
}

function navigateBackward() {
  activeSlideNumber--;
  showActiveSlide(false);
}

function createStepBoxes() {
  const stepBox = document.getElementById("dynamic-step-box");
  const slideCount = slides.length - 2; // Exclude the first and last slides

  for (let i = 0; i < slideCount; i++) {
    const dot = document.createElement("span");
    dot.classList.add("step-box__dot");
    stepBox.appendChild(dot);

    if (i < slideCount - 1) {
      const hr = document.createElement("hr");
      hr.classList.add("step");
      stepBox.appendChild(hr);
    }
  }
}

for (let i = 0; i < slides.length - 1; i++) {
  const radioButtons = slides[i].querySelectorAll('input[type="radio"]');
  for (let j = 0; j < radioButtons.length; j++) {
    radioButtons[j].addEventListener("change", function () {
      if (isAnswerSelected()) {
        nextBtn.disabled = false;
      }
    });
  }
}

function showActiveSlide(isMoveForward) {
  if (isMoveForward) {
    if (activeSlideNumber < slides.length - 1) {
      if (isAnswerSelected()) {
        nextBtn.disabled = false;
      } else {
        nextBtn.disabled = true;
      }
    }
    // Disable previous slide and enable active slide
    slides[activeSlideNumber - 1].classList.toggle("form-row-active");
    slides[activeSlideNumber].classList.toggle("form-row-active");

    if (activeSlideNumber == 1) {
      backBtn.disabled = true;
    } else if (activeSlideNumber === 2) {
      backBtn.disabled = false;
    } else if (activeSlideNumber == slides.length - 2) {
      nextBtn.innerText = "Afslut quizzen";
    } else if (activeSlideNumber == slides.length - 1) {
      stepBtns.style.display = "none";
      againBtn.style.display = "block";

      //Prints checked value of radioButtons
      const radioButtons = document.querySelectorAll(
        'input[type="radio"]:checked'
      );

      const checkAnswer = document.getElementsByClassName("checkanswer");
      let correctAnswers = 0;
      let incorrectAnswers = 0;
      const totalAnswerCount = document.getElementById("totalAnswerCount");

      for (let i = 0; i < checkAnswer.length; i++) {
        checkAnswer[i].innerHTML = radioButtons[i].value;

        if (checkAnswer[i].innerHTML == "true") {
          checkAnswer[i].innerHTML = "Korrekt!";
          correctAnswers++;
        } else {
          checkAnswer[i].innerHTML = "Forkert!";
          incorrectAnswers++;
        }
      }
      totalAnswerCount.innerHTML =
        "Du har " +
        correctAnswers +
        (correctAnswers < 2 ? " korrekt svar!" : " korrekte svar!") +
        (correctAnswers > 5
          ? " Godt gået! Du kan din datalovgivning!"
          : " Der skal vidst læses lidt op på datalovgivning!");
      if (correctAnswers > 5) {
        thumbsbUpImg.style.display = "block";
      } else {
        thumbsDownImg.style.display = "block";
      }
      console.log(
        "Du havde " +
          correctAnswers +
          " korrekte svar!!" +
          (correctAnswers > 5 ? " Godt gået!!" : "")
      );
      console.log(
        "... og " +
          incorrectAnswers +
          " forkerte svar!!" +
          (incorrectAnswers > 5 ? " ØV!!" : "")
      );
    }

    // Only update dots on slide 1-8
    if (activeSlideNumber > 0 && activeSlideNumber < slides.length - 1) {
      const dots = document.getElementsByClassName("step-box__dot");
      dots[activeSlideNumber - 1].classList.toggle("dot-active");
    }
  } else {
    if (isAnswerSelected()) {
      nextBtn.disabled = false;
    } else {
      nextBtn.disabled = true;
    }
    // Disable previous slide and enable active slide
    slides[activeSlideNumber].classList.toggle("form-row-active");
    slides[activeSlideNumber + 1].classList.toggle("form-row-active");

    if (activeSlideNumber == 1) {
      backBtn.disabled = true;
    } else if (activeSlideNumber == 7) {
      nextBtn.innerText = "Næste";
    }

    if (activeSlideNumber - 1 < dots.length) {
      dots[activeSlideNumber].classList.toggle("dot-active");
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
  // Set a cookie that expires in 30 days
  document.cookie = "cookiesAccepted=true; max-age=" + 30 * 24 * 60 * 60;

  cookieModal.style.display = "none";
}

window.onload = function () {
  // Check if the cookie exists
  if (
    !document.cookie
      .split(";")
      .some((item) => item.trim().startsWith("cookiesAccepted="))
  ) {
    // The cookie doesn't exist, so we show the popup
    cookieModal.style.display = "block";
  }
};

/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function openNavBurger() {
  const x = document.getElementById("topnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

window.addEventListener("load", createStepBoxes);
