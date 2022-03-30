//Anette og Julians Seje Quiz (og mest Anders)

//Dots
const stepBtns = document.getElementById("step-btn");

const dot = document.getElementsByClassName("step-dot");
const slide = document.getElementsByClassName("form-row");

//Buttons
const startBtn = document.getElementById("btn-start");
const againBtn = document.getElementById("btn-tryagain");
const backBtn = document.getElementById("btn-back");
const nextBtn = document.getElementById("btn-next");


let activeSlideNumber = 0;

function startQuiz() {
    activeSlideNumber = 0;
    navigateForward();

    startBtn.style.display = "none";
    stepBtns.style.display = "flex";
    //Starts timer
    startTimer()
}

// Timer as function
function startTimer() {
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
    againBtn.style.display = "none";
    // ... and start quiz again
    startQuiz();
}



// THIS NEEDS TO WORK!
/*
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

//Not necessary since btn now activates navigate<>
/* function dotChangeNext() {
    navigateForward();
}

function dotChangeBack() {
    navigateBackward();
} */

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
            againBtn.style.display = "block";

            //Prints checked value of radioButtons
            const radioButtons = document.querySelectorAll('input[type="radio"]:checked');
            for (let i = 0; i < radioButtons.length; i++) {
                console.log(radioButtons[i].value);

            }

            const checkAnswer = document.getElementsByClassName("checkanswer");
            for (let i = 0; i < checkAnswer.length; i++) {
                checkAnswer[i].innerHTML = radioButtons[i].value;
                
                // Hvorfor virker denne ikke?
/*                 if (checkAnswer[i].innerHTML = "true") {
                    checkAnswer[i].innerHTML = "Korrekt!";
                } else {
                    checkAnswer[i].innerHTML = "Forkert!";
                } */
            }

            //OLD solution
/*             checkAnswer[0].innerHTML = radioButtons[0].value;
            checkAnswer[1].innerHTML = radioButtons[1].value;
            checkAnswer[2].innerHTML = radioButtons[2].value;
            checkAnswer[3].innerHTML = radioButtons[3].value;
            checkAnswer[4].innerHTML = radioButtons[4].value;
            checkAnswer[5].innerHTML = radioButtons[5].value;
            checkAnswer[6].innerHTML = radioButtons[6].value;
            checkAnswer[7].innerHTML = radioButtons[7].value; */


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
function openNavBurger() {
    const x = document.getElementById("topnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}
