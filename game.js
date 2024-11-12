const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progessBarFull = document.getElementById('progessBarFull');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];

fetch("questions.json").then(res => {
  return res.json();
})
.then(loadedQuestions => {
  questions = loadedQuestions
  startGame();
})
//.catch(err => {
//  alert(err);
//});
//constants
const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 15;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [... questions];
  getNewQuestion();
}
getNewQuestion = () => {

  if(availableQuestions.lenght === 0 || questionCounter >= MAX_QUESTIONS){
    //GO TO END PAGE
    return window.location.assign('end.html');
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //update the progess Bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
  
  
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;
  
  choices.forEach( choice => {
    const number = choice.dataset["number"];
   choice.innerText = currentQuestion[ 'choice' + number];
  });
  
  availableQuestions.splice(questionIndex, 1);
  
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener('click', e => {
    if(!acceptingAnswers) return;
    
    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset['number'];
    
  
//const classtoapply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
    let classToApply = 'incorrect';
    if(selectedAnswer == currentQuestion.Answer){
      classToApply = 'correct';
    }

    if(classToApply === 'correct'){
      incrementScore(CORRECT_BONUS);
    }
    selectedChoice.parentElement.classList.add(classToApply);
    
   setTimeout( () => {
         selectedChoice.parentElement.classList.remove(classToApply);
    
    getNewQuestion();
   }, 1000) 
  })
})

incrementScore = num => {
  score += num;
  scoreText.innerText = score
}

