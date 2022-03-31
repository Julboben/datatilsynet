//Anette og Julians Seje Quiz (og lidt Anders)

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
let hasTimerBeenStarted = false;

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
    for (let i = 0; i < dot.length; i++) {
        dot[i].classList.remove("dot-active");
    }
    // Reset slides
    slide[activeSlideNumber].classList.toggle("form-row-active");
    slide[0].classList.toggle("form-row-active");

    //Reset thumbImg
    thumsbUpImg.style.display = "none";
    thumsDownImg.style.display = "none";

    // Reset buttons
    nextBtn.innerText = "Næste";
    backBtn.classList.toggle("btn-inactive");
    againBtn.style.display = "none";
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

function showActiveSlide(isMoveForward) {
    if (isMoveForward) {
        // Disable previous slide and enable active slide
        slide[activeSlideNumber - 1].classList.toggle("form-row-active");
        slide[activeSlideNumber].classList.toggle("form-row-active");

        if (activeSlideNumber == 2) {
            backBtn.classList.toggle("btn-inactive");
        } else if (activeSlideNumber == (slide.length - 2)) {
            nextBtn.innerText = "Afslut quizzen";
        } else if (activeSlideNumber == (slide.length - 1)) {
            stepBtns.style.display = "none";
            againBtn.style.display = "block";

            //Prints checked value of radioButtons
            const radioButtons = document.querySelectorAll('input[type="radio"]:checked');
            for (let i = 0; i < radioButtons.length; i++) {
                console.log(radioButtons[i].value);

            }

            const checkAnswer = document.getElementsByClassName("checkanswer");
            let correctAnswers = 0;
            let incorrectAnswers = 0;
            const totalAnswerCount = document.getElementById("totalAnswerCount");
            const thumsbUpImg = document.getElementById("thumbsUpImg");
            const thumbsDownImg = document.getElementById("thumbsDownImg");
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
            totalAnswerCount.innerHTML = "Du har " + correctAnswers + (correctAnswers < 2 ? " korrekt svar!" : " korrekte svar!") + (correctAnswers > 5 ? " Godt gået! Du kan din datalovgivning!" : " Der skal vidst læses lidt op på datalovgivning!");
            if (correctAnswers > 5) {
                thumsbUpImg.style.display = "block";
            } else {
                thumbsDownImg.style.display = "block";
            }
            console.log('Du havde ' + correctAnswers + ' korrekte svar!!' + (correctAnswers > 5 ? ' Godt gået!!' : ''));
            console.log('... og ' + incorrectAnswers + ' forkerte svar!!' + (incorrectAnswers > 5 ? ' ØV!!' : ''));
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
