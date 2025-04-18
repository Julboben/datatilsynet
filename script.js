//Anette, Maya og Julians Seje Quiz (og lidt Anders)

// --- Global State ---
let currentLanguage = 'da'; // Default language
let langData = {}; // To store loaded language data
let quizData = []; // To store quiz data built from langData
let userAnswers = []; // Initialize later based on quizData length
let activeSlideNumber = 0; // 0 for intro, 1 to quizData.length for questions, quizData.length + 1 for results

// --- Get DOM Elements ---
const stepBtns = document.getElementById("step-btns");
const dotsContainer = document.getElementById("dynamic-step-box");
const formWrapper = document.querySelector(".form-section .wrapper form");

// Buttons
const startBtn = document.getElementById("btn-start");
const againBtn = document.getElementById("btn-tryagain");
const backBtn = document.getElementById("btn-back");
const nextBtn = document.getElementById("btn-next");
const langDaBtn = document.getElementById("btn-lang-da");
const langEnBtn = document.getElementById("btn-lang-en");

// Img and Results elements
const thumbsUpImg = document.getElementById("thumbsUpImg");
const thumbsDownImg = document.getElementById("thumbsDownImg");
const totalAnswerCountEl = document.getElementById("totalAnswerCount");
const resultsSummaryContainer = document.getElementById("results-summary-container");
const resultsSlide = document.getElementById("slide-results");
const introSlide = document.getElementById("slide-0");

// Modal/Dialog elements
const reportModal = document.getElementById("report-modal");
const openReportBtn = document.getElementById("report-btn");
const closeReportBtn = document.getElementById("close-report-modal");

// --- Core Functions ---

async function loadTranslations(langCode) {
  try {
    const response = await fetch(`locales/${langCode}.json`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    langData = await response.json();
    currentLanguage = langCode;
    buildQuizData(); // Rebuild quiz data with new language
    userAnswers = new Array(quizData.length).fill(null); // Reset answers for new language/quiz structure
    translatePage(); // Apply translations to static elements
    // If quiz has started, re-render current slide, otherwise reset to intro
    if (activeSlideNumber > 0 && activeSlideNumber <= quizData.length + 1) {
        // Clear old dynamic slides before showing potentially new ones
        clearDynamicSlides();
        // Attempt to stay on the same logical slide (intro, question index, or results)
        showSlide(); // Re-render the current view with new text
    } else {
        // If on intro or language changed before starting
        restartQuizVisually(); // Reset to intro state
    }

    // Update language button states (optional: add active class)
    updateLanguageButtons();

  } catch (error) {
    console.error("Could not load translations:", error);
    // Optionally display an error message to the user
  }
}

function buildQuizData() {
  if (!langData || Object.keys(langData).length === 0) return; // Ensure langData is loaded

  quizData = Object.keys(langData)
    .filter(key => key.startsWith('q') && key.endsWith('_image'))
    .map(imageKey => {
      const qNum = imageKey.split('_')[0];
      return {
        image: langData[imageKey],
        title: langData[langData[`${qNum}_titleKey`]],
        description: langData[langData[`${qNum}_descriptionKey`]],
        question: langData[langData[`${qNum}_questionKey`]],
        options: langData[`${qNum}_options`].map(option => ({
          text: langData[option.textKey],
          value: option.value
        })),
        name: langData[`${qNum}_name`]
      };
    });
}

function translatePage() {
  if (!langData || Object.keys(langData).length === 0) return; // Don't run if no data

  document.querySelectorAll('[data-translate]').forEach(element => {
    const key = element.getAttribute('data-translate');
    if (langData[key]) {
      element.textContent = langData[key];
    }
  });
  document.querySelectorAll('[data-translate-html]').forEach(element => {
      const key = element.getAttribute('data-translate-html');
      if (langData[key]) {
          element.innerHTML = langData[key];
      }
  });
  document.querySelectorAll('[data-translate-alt]').forEach(element => {
    const key = element.getAttribute('data-translate-alt');
    if (langData[key]) {
      element.alt = langData[key];
    }
  });
  // Special case for title tag
  const titleElement = document.querySelector('title[data-translate]');
  if (titleElement) {
    const key = titleElement.getAttribute('data-translate');
    if (langData[key]) {
        document.title = langData[key];
    }
  }
}

// --- Helper Functions ---
function clearDynamicSlides() {
    const questionSlides = formWrapper.querySelectorAll(".question-slide");
    questionSlides.forEach((slide) => slide.remove());
    // Also clear results if they were rendered
    resultsSummaryContainer.innerHTML = "";
    if (totalAnswerCountEl && langData.resultsDefaultError) {
        totalAnswerCountEl.textContent = langData.resultsDefaultError;
    }
    if (thumbsUpImg) thumbsUpImg.style.display = "none";
    if (thumbsDownImg) thumbsDownImg.style.display = "none";
}

function hideAllSlides() {
  if(introSlide) {
    introSlide.classList.remove("form-row-active");
    introSlide.style.display = "none";
  }
  if(resultsSlide) {
    resultsSlide.classList.remove("form-row-active");
    resultsSlide.style.display = "none";
  }
  const questionSlides = formWrapper.querySelectorAll(".question-slide");
  questionSlides.forEach((slide) => (slide.style.display = "none"));
}

function updateDots() {
  const dots = dotsContainer.getElementsByClassName("step-box__dot");
  Array.from(dots).forEach((dot, i) => {
    const isActive = i < activeSlideNumber - 1; // Adjust logic if needed
    dot.classList.toggle("dot-active", isActive);
    dot.setAttribute("aria-current", isActive ? "step" : "false");
    // Add or update aria-label
    const stepNumber = i + 1;
    const labelKey = isActive ? 'dotLabelActive' : 'dotLabelInactive';
    const labelText = (langData[labelKey] || "Step {stepNumber}").replace("{stepNumber}", stepNumber);
    dot.setAttribute("aria-label", labelText);
  });
  // Ensure the container has a label
  if (dotsContainer && !dotsContainer.hasAttribute('aria-label') && langData.stepIndicatorLabel) {
      dotsContainer.setAttribute('aria-label', langData.stepIndicatorLabel);
  }
}

function isAnswerSelectedForCurrentSlide() {
  if (activeSlideNumber > 0 && activeSlideNumber <= quizData.length) {
    const currentQuestionIndex = activeSlideNumber - 1;
    return userAnswers[currentQuestionIndex] !== null;
  }
  return true;
}

function storeSelectedAnswer(questionIndex) {
  const currentSlide = document.getElementById(`slide-${questionIndex + 1}`);
  if (!currentSlide || !quizData[questionIndex]) return;

  const radioButtons = currentSlide.querySelectorAll(
    `input[name="${quizData[questionIndex].name}"]`
  );
  let answerStored = false;
  radioButtons.forEach((radio, i) => {
      if (radio.checked) {
          userAnswers[questionIndex] = i;
          answerStored = true;
      }
  });

  if (nextBtn) nextBtn.disabled = !answerStored;

  // If no answer is selected after check (shouldn't happen with click listener)
  if (!answerStored) {
      userAnswers[questionIndex] = null;
  }
}

// --- Slide Rendering Functions ---

function renderQuestionSlide(questionIndex) {
  if (!quizData || !langData || !quizData[questionIndex]) return;

  const questionData = quizData[questionIndex]; // Define questionData here
  const slideId = `slide-${questionIndex + 1}`;
  let slide = document.getElementById(slideId);

  // Only create if it doesn't exist (essential for language change)
  if (!slide) {
    slide = document.createElement("div");
    slide.className = "row form-row question-slide";
    slide.id = slideId;

    // Prepare fieldset/legend structure
    const fieldsetId = `question-options-${questionIndex}`;
    const legendId = `question-legend-${questionIndex}`;

    const optionsHtml = questionData.options
      .map(
        (option, index) => `
            <input
              type="radio"
              id="${questionData.name}${index}"
              name="${questionData.name}"
              value="${option.value}"
              data-option-index="${index}" ${ // Check against potentially pre-existing answers
          userAnswers[questionIndex] === index ? "checked" : ""
        }
            />
            <label for="${questionData.name}${index}">${option.text}</label><br />
        `
      )
      .join("");

    slide.innerHTML = `
            <div class="col">
                <img src="${questionData.image}" class="img-fluid question-image" alt="${questionData.title}" />
            </div>
            <div class="col">
                <h2 class="question-topic" tabindex="-1">${questionData.title}</h2>
                <p class="question-description">${questionData.description}</p>
                <fieldset id="${fieldsetId}" class="options-container" role="radiogroup" aria-labelledby="${legendId}">
                    <legend id="${legendId}" class="question-title">${questionData.question}</legend>
                    <p><i>${langData.quizOptionSelectHelper || 'Select only one answer:'}</i></p>
                    ${optionsHtml}
                </fieldset>
            </div>
        `;
    // Insert the new slide before the results slide
    if (resultsSlide) {
        resultsSlide.parentNode.insertBefore(slide, resultsSlide);
    } else {
        formWrapper.appendChild(slide); // Fallback if results slide isn't found
    }

    // Add event listeners ONLY when creating the slide
    const radioButtons = slide.querySelectorAll(
      `input[name="${questionData.name}"]`
    );
    radioButtons.forEach((radio) => {
      radio.addEventListener("click", () => storeSelectedAnswer(questionIndex));
    });
  }

  // Ensure slide is displayed
  slide.style.display = "grid";

  updateDots();
  updateButtonStates();
}

function renderResultsSlide() {
  if (!resultsSlide || !langData || !quizData || quizData.length === 0) return;

  // Make heading focusable
  const resultsHeading = resultsSlide.querySelector("h2");
  if (resultsHeading) {
      resultsHeading.setAttribute('tabindex', '-1');
  }

  resultsSlide.classList.add("form-row-active");
  resultsSlide.style.display = "grid";

  if(stepBtns) stepBtns.style.display = "none";
  if(againBtn) againBtn.style.display = "block";
  if(thumbsUpImg) thumbsUpImg.style.display = "none";
  if(thumbsDownImg) thumbsDownImg.style.display = "none";

  let correctAnswers = 0;
  const resultsColumns = [[], []];

  quizData.forEach((question, index) => {
    const selectedOptionIndex = userAnswers[index];
    let userAnswerText = langData.answerMissing || "Answer missing!";
    let isCorrect = false;
    let correctAnswerText = "";

    const correctOption = question.options.find(opt => String(opt.value).toLowerCase() === "true");
    if (correctOption) {
      correctAnswerText = correctOption.text;
    }

    if (selectedOptionIndex !== null && question.options[selectedOptionIndex]) {
      const selectedOption = question.options[selectedOptionIndex];
      userAnswerText = selectedOption.text;
      isCorrect = String(selectedOption.value).toLowerCase() === "true";
      if (isCorrect) {
        correctAnswers++;
      }
    }

    const resultItemHtml = `
            <div>
                <h3 class="question-title">${question.question}</h3>
                <p>
                    ${langData.resultsYouAnswered || 'You answered:'} <span class="user-answer ${isCorrect ? "correct" : "incorrect"}">${userAnswerText}</span>
                    ${!isCorrect ? `<br/><span class="correctanswer">${langData.resultsCorrectAnswerWas || 'Correct answer:'} ${correctAnswerText}</span>` : ""}
                </p>
            </div>
        `;

    if (index < Math.ceil(quizData.length / 2)) {
      resultsColumns[0].push(resultItemHtml);
    } else {
      resultsColumns[1].push(resultItemHtml);
    }
  });

  const resultsHtml = `
        <div class="col">
            ${resultsColumns[0].join("")}
        </div>
        <div class="col">
            ${resultsColumns[1].join("")}
        </div>
    `;

  if(resultsSummaryContainer) resultsSummaryContainer.innerHTML = resultsHtml;

  let resultText = (langData.resultsCountText || "You have {correctAnswers} out of {totalQuestions} correct answers!")
    .replace("{correctAnswers}", correctAnswers)
    .replace("{totalQuestions}", quizData.length);

  const isGoodScore = correctAnswers >= Math.ceil(quizData.length * 0.7);
  const feedbackKey = isGoodScore ? 'resultsFeedbackGood' : 'resultsFeedbackBad';
  resultText += langData[feedbackKey] || (isGoodScore ? " Well done!" : " Needs improvement.");

  if(totalAnswerCountEl) totalAnswerCountEl.innerHTML = resultText;

  if (isGoodScore) {
    if(thumbsUpImg) thumbsUpImg.style.display = "block";
  } else {
    if(thumbsDownImg) thumbsDownImg.style.display = "block";
  }

  console.log(
    `Brugeren fik ${correctAnswers} korrekte svar ud af ${quizData.length}`
  );
}

function addSlideAnimation(slide) {
  if (!slide) return;
  slide.classList.add("slide-animate");
  slide.addEventListener(
    "animationend",
    function handler() {
      slide.classList.remove("slide-animate");
      slide.removeEventListener("animationend", handler);
    },
    { once: true } // Ensure the listener runs only once
  );
}

function showSlide() {
  if (!quizData || quizData.length === 0) return; // Don't show if no data
  hideAllSlides();

  let slideToShow = null;
  let focusTarget = null;

  if (activeSlideNumber === 0) {
    if (introSlide) {
        introSlide.classList.add("form-row-active");
        introSlide.style.display = "grid";
        slideToShow = introSlide;
        focusTarget = introSlide.querySelector('h2');
    }
    if(startBtn) startBtn.style.display = "block";
    if(stepBtns) stepBtns.style.display = "none";
    if(againBtn) againBtn.style.display = "none";
    if(dotsContainer) dotsContainer.style.visibility = "hidden";
  } else if (activeSlideNumber > 0 && activeSlideNumber <= quizData.length) {
    if(startBtn) startBtn.style.display = "none";
    if(stepBtns) stepBtns.style.display = "flex";
    if(againBtn) againBtn.style.display = "none";
    if(dotsContainer) dotsContainer.style.visibility = "visible";
    renderQuestionSlide(activeSlideNumber - 1);
    slideToShow = document.getElementById(`slide-${activeSlideNumber}`);
    if (slideToShow) {
      focusTarget = slideToShow.querySelector('.question-topic'); // Target the H2 in the question slide
    }
  } else if (activeSlideNumber === quizData.length + 1) {
    if(dotsContainer) dotsContainer.style.visibility = "hidden";
    renderResultsSlide();
    slideToShow = resultsSlide;
    if (slideToShow) {
        focusTarget = slideToShow.querySelector('h2'); // Target the H2 in the results slide
    }
  }

  if (slideToShow) {
    addSlideAnimation(slideToShow);
  }
  // Move focus after the slide is shown and animation might have started
  if (focusTarget) {
      // Delay focus slightly to ensure element is visible and ready
      setTimeout(() => {
          focusTarget.focus();
      }, 100); // Adjust delay if needed
  }
  updateButtonStates();
  updateDots(); // Update dots *after* activeSlideNumber is set
}

function updateButtonStates() {
  if (!langData || Object.keys(langData).length === 0) return; // Requires langData

  if (backBtn) {
    backBtn.disabled = activeSlideNumber <= 1;
  }

  if (nextBtn) {
    if (activeSlideNumber === 0) {
      nextBtn.disabled = true;
      nextBtn.textContent = langData.btnNext || "Next";
    } else if (activeSlideNumber > 0 && activeSlideNumber <= quizData.length) {
      nextBtn.disabled = !isAnswerSelectedForCurrentSlide();
      nextBtn.textContent = activeSlideNumber === quizData.length
          ? (langData.btnFinish || "Finish quiz")
          : (langData.btnNext || "Next");
    } else {
      nextBtn.disabled = true;
      nextBtn.textContent = langData.btnNext || "Next";
    }
  }
}

function updateLanguageButtons() {
    const isDaActive = currentLanguage === 'da';
    const isEnActive = currentLanguage === 'en';

    if (langDaBtn) {
        langDaBtn.classList.toggle('active', isDaActive);
        langDaBtn.setAttribute('aria-current', isDaActive ? 'true' : 'false');
    }
    if (langEnBtn) {
        langEnBtn.classList.toggle('active', isEnActive);
        langEnBtn.setAttribute('aria-current', isEnActive ? 'true' : 'false');
    }
}

// --- Event Handlers and Initialization ---

function startQuiz() {
  activeSlideNumber = 1;
  userAnswers = new Array(quizData.length).fill(null); // Ensure answers array matches quiz length
  clearDynamicSlides(); // Clear previous quiz instances if any
  createStepDots(); // Create dots for the new quiz
  showSlide();
}

function restartQuizVisually() {
    activeSlideNumber = 0;
    userAnswers.fill(null);
    clearDynamicSlides();
    showSlide();
    updateDots();
}

function restartQuiz() {
  // Reload translations for the current language to ensure consistency
  // This also handles resetting the visual state via loadTranslations -> showSlide
  restartQuizVisually(); // Correct call to reset the quiz
}

function navigateForward() {
  if (activeSlideNumber > 0 && activeSlideNumber <= quizData.length) {
    storeSelectedAnswer(activeSlideNumber - 1);
    if (!isAnswerSelectedForCurrentSlide()) {
      console.warn("Cannot navigate forward without selecting an answer.");
      return;
    }
  }

  if (activeSlideNumber <= quizData.length) {
    activeSlideNumber++;

    // Preload the image for the *next* slide after the one we are navigating to
    const nextQuestionIndex = activeSlideNumber; // Index of the slide *after* the current target
    if (nextQuestionIndex < quizData.length) { // Check if there is a slide after the next one
        const nextImageUrl = quizData[nextQuestionIndex].image;
        if (nextImageUrl) {
            const img = new Image();
            img.src = nextImageUrl;
            // Optional: console.log(`Preloading image for slide ${nextQuestionIndex + 1}: ${nextImageUrl}`);
        }
    }

    showSlide();
  }
}

function navigateBackward() {
  if (activeSlideNumber > 1) {
    activeSlideNumber--;
    showSlide();
  }
}

function createStepDots() {
  if (!dotsContainer || !quizData || quizData.length === 0) return;
  dotsContainer.innerHTML = "";
  const slideCount = quizData.length;

  for (let i = 0; i < slideCount; i++) {
    const dot = document.createElement("span");
    dot.classList.add("step-box__dot");
    dotsContainer.appendChild(dot);

    if (i < slideCount - 1) {
      const hr = document.createElement("hr");
      hr.classList.add("step");
      dotsContainer.appendChild(hr);
    }
  }
  dotsContainer.style.visibility = "hidden";
}

function infoPopup() {
  const popup = document.getElementById("info-popuptext");
  popup?.classList.toggle("info-show");
}

const cookieModal = document.getElementById("cookie-popup");
function closeCookiePopup() {
  document.cookie = "cookiesAccepted=true; max-age=" + 30 * 24 * 60 * 60;
  if (cookieModal) cookieModal.style.display = "none";
}

function openNavBurger() {
  const x = document.getElementById("topnav");
  if (x) {
    x.classList.toggle("responsive");
  }
}

// --- Initial Setup ---
window.addEventListener("load", async () => {
  // Load default language first
  await loadTranslations(currentLanguage);

  // Now that translations and quizData are loaded, setup the rest
  createStepDots();
  showSlide(); // Show the initial slide (intro)

  // Add button listeners after elements exist
  if (startBtn) startBtn.addEventListener("click", startQuiz);
  if (againBtn) againBtn.addEventListener("click", restartQuiz);
  if (nextBtn) nextBtn.addEventListener("click", navigateForward);
  if (backBtn) backBtn.addEventListener("click", navigateBackward);
  if (langDaBtn) langDaBtn.addEventListener("click", () => loadTranslations('da'));
  if (langEnBtn) langEnBtn.addEventListener("click", () => loadTranslations('en'));
  if (openReportBtn) openReportBtn.addEventListener("click", () => reportModal?.showModal());
  if (closeReportBtn) closeReportBtn.addEventListener("click", () => reportModal?.close());

  // Report Dialog close on backdrop click
  if (reportModal) {
      reportModal.addEventListener("click", (event) => {
          if (event.target === reportModal) {
              reportModal.close();
          }
      });
  }

  // Check for cookie popup on load
  if (cookieModal && !document.cookie.split(";").some((item) => item.trim().startsWith("cookiesAccepted="))) {
    cookieModal.style.display = "block";
  }
});
