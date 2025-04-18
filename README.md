# Datatilsynet Quiz Game

## Project Structure

```text
css/
    style.css
img/
index.html
presentation/
    Præsentation_Datatilsynet_gruppe_9_01-04-22.pptx
README.md
script.js
```

## Description

This is a school project that includes a quiz game. The game is implemented in JavaScript and uses HTML and CSS for the user interface.

---

## Main Features

- Quiz game with multiple questions
- Navigation buttons to move forward and backward through the quiz
- Start and try again buttons
- Info popup box
- Cookie consent popup
- Responsive navigation bar
- **Results summary** at the end of the quiz
- **Modal dialog** to show detailed results/report
- **Language support** (Danish/English)

---

## JavaScript Functions

The main JavaScript functions in the project are:

- `loadTranslations`: Loads language data
- `buildQuizData`: Constructs the quiz questions based on language data
- `translatePage`: Applies translations to static UI elements
- `clearDynamicSlides`: Removes question slides and result elements
- `hideAllSlides`: Hides all quiz-related slides
- `preloadImages`: Preloads images for smoother transitions
- `updateDots`: Updates the progress indicator dots
- `storeSelectedAnswer`: Saves the user's answer for the current question
- `renderQuestionSlide`: Creates and displays a single question slide
- `renderResultsSlide`: Creates and displays the final results summary slide
- `addSlideAnimation`: Adds animation to slide transitions
- `showSlide`: Manages which slide (intro, question, results) is currently visible
- `updateButtonStates`: Enables/disables navigation buttons based on quiz state
- `startQuiz`: Starts the quiz
- `restartQuiz`: Restarts the quiz
- `navigateForward`: Navigates to the next question or results
- `navigateBackward`: Navigates to the previous question
- `createStepDots`: Generates the progress indicator dots dynamically
- `infoPopup`: Toggles the display of an info popup box
- `closeCookiePopup`: Closes the cookie consent popup
- `openNavBurger`: Toggles the responsive navigation bar
- `reportModal`, `openReportBtn`, `closeReportBtn`: Functions/event listeners for the report modal

---

## How to Run

Open `index.html` in your web browser to start the quiz game.

---

## Contributors

- Maya
- [Anette](https://github.com/AnetteThavlov)
- [Julian](https://github.com/Julboben)
- Anders

---

**Disclaimer:** This is a school project and is not intended for production or commercial use.
