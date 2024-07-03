
// creating array name quizdata
const quizData = [
    {
      question: 'What is the answer of 2 + 2?',
      options: ['4', '5', '3', '6'],
      answer: '4',
    },
    {
      question: 'What is the answer of 5 * 6?',
      options: ['24', '20', '30', '32'],
      answer: '30',
    },
    {
      question: 'What is the answer of 12 - 3?',
      options: ['10', '8', '11', '9'],
      answer: '9',
    },
    {
      question: 'What is the answer of 8 / 2?',
      options: ['2', '4', '3', '5'],
      answer: '4',
    },
    {
      question: 'Which is the answer of  8 % 2?',
      options: ['0', '2', '1', '3'],
      answer: '0',
    },
];
// DOM manipulation using js
const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const closeButton = document.getElementById('close');
const retryButton = document.getElementById('retry');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];
// function responsible for displaying question
function displayQuestion() {
    const questionData = quizData[currentQuestion];

    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;

    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';

    questionData.options.forEach(option => {
        const label = document.createElement('label');
        label.className = 'option';

        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'quiz';
        radio.value = option;

        const optionText = document.createTextNode(option);

        label.appendChild(radio);
        label.appendChild(optionText);
        optionsElement.appendChild(label);
    });

    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
}
 // function responsible for checking answer
 function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
        const answer = selectedOption.value;
        const correctAnswer = quizData[currentQuestion].answer;
        const isCorrect = answer === correctAnswer;
        if (isCorrect) {
            score++;
        } else {
            incorrectAnswers.push({
                question: quizData[currentQuestion].question,
                incorrectAnswer: answer,
                correctAnswer: correctAnswer,
            });
        }
        resultContainer.innerHTML = isCorrect ? 'Correct!' : 'Incorrect!';
        currentQuestion++;
        selectedOption.checked = false;
        if (currentQuestion < quizData.length) {
            setTimeout(() => {
                displayQuestion();
                resultContainer.innerHTML = '';
            }, 1000); // Wait for 1 second before displaying the next question
        } else {
            setTimeout(displayResult, 1000);
        }
    }
}
// function responsible for displaying result 
function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    closeButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    closeButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
}
 function closeQuiz(){
    currentQuestion = quizData.length;
    displayResult();
 }
submitButton.addEventListener('click', checkAnswer);
closeButton.addEventListener('click', closeQuiz);
retryButton.addEventListener('click', retryQuiz);

displayQuestion();
