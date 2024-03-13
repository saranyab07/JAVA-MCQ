const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const alert = document.querySelector('.alert');
const startBtn = document.querySelector('.startBtn');
const timer = document.querySelector('.timer');


// Make an array of objects that stores question, choices of question and answer
const quiz = [
    {
        question: "Q. Which of the following option leads to the portability and security of Java?",
        choices: ["Bytecode is executed by JVM", "The applet makes the Java code secure and portable", "Use of exception handling","Dynamic binding between objects"],
        answer: "Bytecode is executed by JVM"
    },
    {
        question: "Q.What is the return type of the hashCode() method in the Object class?",
        choices: ["Object", "int", "long", "void"],
        answer: "int"
    },
    {
        question: "Q. What does the expression float a = 35 / 0 return?",
        choices: ["0", "Not a Number", "Infinity", "Run time exception"],
        answer: "Infinity"
    },
    {
        question: "Which option is false about the final keyword?",
        choices: ["A final method cannot be overridden in its subclasses.", "A final class cannot be extended.", "A final class cannot extend other classes.","A final method can be inherited."],
        answer: "A final class cannot extend other classes."
    },
    {
        question: "Q. Which package contains the Random class?",
        choices: ["java.util package", "java.lang package", "java.awt package","java.io package"],
        answer: "java.util package"
    },
    {
        question: "Which keyword is used for accessing the features of a package?",
        choices: ["package", "import", "extends","export"],
        answer: "import"
    },
    {
        question: "Number of primitive data types in Java are?",
        choices: ["7", "8", "6","9"],
        answer: "8"
    },
    {
        question: "What is the size of float and double in java?",
        choices: ["32 and 64", "32 and 32", "64 and 64","64 and 32"],
        answer: "32 and 64"
    },
    {
        question: "Select the valid statement.",
        choices: ["char[] ch=new char (5)", "char[] ch=new char [5]", "char[] ch=new char ()","char[] ch=new char []"],
        answer: "char[] ch=new char [5]"
    },
    {
        question: "Arrays in java are-",
        choices: ["object references", "object", "primitive data type","None"],
        answer: "object"
    },
    {
        question: "Identify the corrected definition of a package.",
        choices: ["A package is a collection of editing tools", "A package is a collection of classes", "A package is a collection of classes and interfaces","A package is a collection of interfaces"],
        answer: "A package is a collection of classes and interfaces"
    },
    {
        question: "Identify the modifier which cannot be used for constructor.",
        choices: ["public", "protected", "static","private"],
        answer: "static"
    },
    {
        question: "Exception created by try block is caught in which block",
        choices: ["catch", "throw", "final","none"],
        answer: "catch"
    },
    {
        question: "Which of the following is not an OOPS concept in Java?",
        choices: ["Polymorphism", "Inheritance", "Compilation","Encapsulation"],
        answer: "Compilation"
    },
    {
        question: "What is not the use of “this” keyword in Java?",
        choices: ["Referring to the instance variable when a local variable has the same name", "Passing itself to the method of the same class", "Passing itself to another method"," Calling another constructor in constructor chaining"],
        answer: "Passing itself to the method of the same class"
    },
    {
        question: "What is the extension of compiled java classes?",
        choices: [".txt", ".js",".class",".java"],
        answer: ".class"
    },
    {
        question: "Which exception is thrown when java is out of memory?",
        choices: ["MemoryError", "OutOfMemoryError", "MemoryOutOfBoundsException","MemoryFullException"],
        answer: "OutOfMemoryError"
    },
    {
        question: "How can we access methods for file handling in java?",
        choices: ["Java.files", "Java.io", "Java.io.File","Java.FileHandling"],
        answer: "Java.io.File"
    },
    {
        question: "Which keyword is used to inherit classes in Java?",
        choices: ["extends", "inheritance", "isChild","None of these"],
        answer: "extends"
    },
    {
        question: "What are packages in Java?",
        choices: ["Methods of a friend class", "Methods of the main class", "Way to encapsulate a group of classes, sub-packages, and interface","All of these"],
        answer: "Way to encapsulate a group of classes, sub-packages, and interface"
    }
];

// Making Variables
let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 15;
let timerID = null;

// Arrow Function to Show Questions
const showQuestions = () => {
    const questionDetails = quiz[currentQuestionIndex];
    questionBox.textContent = questionDetails.question;

    choicesBox.textContent = "";
    for (let i = 0; i < questionDetails.choices.length; i++) {
        const currentChoice = questionDetails.choices[i];
        const choiceDiv = document.createElement('div');
        choiceDiv.textContent = currentChoice;
        choiceDiv.classList.add('choice');
        choicesBox.appendChild(choiceDiv);

        choiceDiv.addEventListener('click', () => {
            if (choiceDiv.classList.contains('selected')) {
                choiceDiv.classList.remove('selected');
            }
            else {
                choiceDiv.classList.add('selected');
            }
        });
    }

    if(currentQuestionIndex < quiz.length){
        startTimer();
    }
}

// Function to check answers
const checkAnswer = () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (selectedChoice.textContent === quiz[currentQuestionIndex].answer) {
        // alert("Correct Answer!");
        displayAlert("Correct Answer!");
        score++;
    }
    else {
        // alert("Wrong answer");
        displayAlert(`Wrong Answer! ${quiz[currentQuestionIndex].answer} is the Correct Answer`);
    }
    timeLeft = 15;
    currentQuestionIndex++;
    if (currentQuestionIndex < quiz.length) {
        showQuestions();
    }
    else {
        stopTimer();
        showScore();
    }
}

// Function to show score
const showScore = () => {
    questionBox.textContent = "";
    choicesBox.textContent = "";
    scoreCard.textContent = `You Scored ${score} out of ${quiz.length}!`;
    displayAlert("You have completed this quiz!");
    nextBtn.textContent = "Play Again";
    quizOver = true;
    timer.style.display = "none";
}

// Function to Show Alert
const displayAlert = (msg) => {
    alert.style.display = "block";
    alert.textContent = msg;
    setTimeout(()=>{
        alert.style.display = "none";
    }, 2000);
}

// Function to Start Timer
const startTimer = () => {
    clearInterval(timerID); // Check for any exist timers
    timer.textContent = timeLeft;

    const countDown = ()=>{
        timeLeft--;
        timer.textContent = timeLeft;
        if(timeLeft === 0){
            const confirmUser = confirm("Time Up!!! Do you want to play the quiz again");
            if(confirmUser){
                timeLeft = 15;
                startQuiz();
            }
            else{
                startBtn.style.display = "block";
                container.style.display = "none";
                return;
            }
        }
    }
    timerID = setInterval(countDown, 1000);
}

// Function to Stop Timer
const stopTimer = () =>{
    clearInterval(timerID);
}

// Function to shuffle question
const shuffleQuestions = () =>{
    for(let i=quiz.length-1; i>0; i--){
        const j = Math.floor(Math.random() * (i+1));
        [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
    }
    currentQuestionIndex = 0;
    showQuestions();
}

// Function to Start Quiz
const startQuiz = () =>{
    timeLeft = 15;
    timer.style.display = "flex";
    shuffleQuestions();
}

// Adding Event Listener to Start Button
startBtn.addEventListener('click', ()=>{
    startBtn.style.display = "none";
    container.style.display = "block";
    startQuiz();
});

nextBtn.addEventListener('click', () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (!selectedChoice && nextBtn.textContent === "Next") {
        // alert("Select your answer");
        displayAlert("Select your answer");
        return;
    }
    if (quizOver) {
        nextBtn.textContent = "Next";
        scoreCard.textContent = "";
        currentQuestionIndex = 0;
        quizOver = false;
        score = 0;
        startQuiz();
    }
    else {
        checkAnswer();
    }
});