var startBtn = document.getElementById('start-btn');
var saveBtn = document.getElementById("save-btn");
var reloadBtn = document.getElementById("reload");
var clearBtn = document.getElementById("clear-all");
var questionList = [
    "Commonly used data-types do NOT include",
    "The condition in an if/else statement is enclosed with ______.",
    "Arrays in JavaScript can be used to store ______",
    "String values must be enclosed within ______ when being assigned to variables.",
    "A very useful tool used during development and debugging for printing content to the debugger is:"
]
var answerList = [
    ["strings", "booleans", "alerts", "numbers"],
    ["quotes", "curly brackets", "parenthesis", "square brackets"],
    ['numbers and strings', 'other arrays', 'booleans', 'all of the above'],
    ['commas', 'curly brackets', 'quotes', 'square brackets'],
    ['JavaScript', 'terminal/bash', 'for-loops', 'console.log']
]
var answerKey = ["alerts", "parenthesis", "all of the above", "quotes", "console.log"]
//Declare variable for quiz timer
var timeLeft = document.getElementById("timer");
//Declare variable for score
//Variables for quiz content
var heading = document.getElementById("challengeHeading");
var para = document.getElementById("intro")
var quizContent = document.getElementById("opening")
var scoreCard = document.querySelector(".score-card")
var scoreBoard = document.querySelector(".score-board")
//Make heading that will contain the question
var makeHeading = document.createElement("h2")
//Make ordered list that will contain answer options
var makeOl = document.createElement("ol");
//Variable to progress through question list
var k = 0;
//Function to create quiz timer
var startTime = 75;
//Initial score, obviously 0
var score = 0;
//Initialize score list as an empty array
var scoreList = [];

getlocal()
function quizTimer() {

    //set interval to variable
    var countdown = setInterval(() => {
        timeLeft.innerHTML = `Time Left: ${startTime} seconds`;
        startTime--;
        if (k > 4) {
            clearInterval(countdown);
            displayScore()
            timeLeft.innerHTML = "Success!"
        }
        else if (startTime < 0) {
            clearInterval(countdown);
            timeLeft.innerHTML = 'TIMES UP!!'
            displayScore()
        }
    }, 1000);
}

function makeList() {
    //Remove all elements in central landing page by setting to empty string
    quizContent.innerHTML = ''

    //Set heading content to first question from questionList
    makeHeading.textContent = `1. ${questionList[0]}`;
    //Appends question to quiz container
    quizContent.appendChild(makeHeading);
    //Make ordered list element to attach answerList elements.
    quizContent.appendChild(makeOl);

    // //For loop to print list of answers
    for (var i = 0; i < answerList[0].length; i++) {
        //If makeLi was defined outside of this loop, it only makes 1 list item, not 100% sure why.
        var makeLi = document.createElement("li")
        //sets list item content to elements from first array in answerList
        makeLi.textContent = `${answerList[0][i]}`;
        //Append newly created list item to previously created ordered list
        makeOl.append(makeLi)
    }
}
function quizStart() {
    quizTimer();
    makeList();
}



function answerCheck(e) {
    if (e.target.tagName.toLowerCase() === "li") {

        if (answerKey.includes(e.target.innerHTML)) {
            //If answer is correct, gain point
            score += 5;

        } else {
            //if answer is incorrect, lose time
            startTime -= 10;
        }
        quizProceed()
    }
}

function quizProceed() {
    //Increments k value to select next element/array in list for both Question and Answer lists
    k++
    //If user has answered final question, clears screen with completion message and stops rest of function
    if (k > 4) {
        displayScore()
    }
    //If there are more questions, function continues to run
    else {
        //Prints next question from array
        document.querySelector("h2").innerHTML = `${k + 1}. ${questionList[k]}`
        var selectLi = document.querySelectorAll("li");
        for (i = 0; i < selectLi.length; i++) {
            selectLi[i].innerHTML = `${answerList[k][i]}`;
        }
    }
}

function displayScore() {
    //Removes ol and its child elements
    quizContent.removeChild(quizContent.lastChild)
    //Change heading from questions to completion
    makeHeading.innerHTML = "All done!"
    //Create element displaying final score
    var showScore = document.createElement("p");
    showScore.textContent = `Your final score is ${score}`
    quizContent.appendChild(showScore)
    //Reveal input to memorialize users incredible performance
    scoreCard.style.display = "block"
}


//Saves current score to localStorage
function setLocal() {
    //Takes user initial input
    var initials = input.value;
    //Combine initials and score into a string
    var finalScore = `${initials} - ${score}`
    //Add score to score list array
    scoreList.push(finalScore)
    //converts array to string
    scoreListString = JSON.stringify(scoreList);
    localStorage.setItem("Score", scoreListString)

}
function getlocal() {
    //retrieves scores from local storage
    var retrievedScoreListString = localStorage.getItem("Score");
    //if there is no stored data, stops function running
    if (retrievedScoreListString === null) {
        return;
    } else {
        //convert retrieved score from string to array
        var retrievedScoreList = JSON.parse(retrievedScoreListString)
        //Adds retrieved array to scorelist
        var combinedList = scoreList.concat(retrievedScoreList)
        //return scorelist as an array of scores currently found in local storage    
        return scoreList = combinedList;
    }
}

//Function to create a list of previously saved high scores
function showHighScore() {
    //Clears list content to prevent list from repeating on repeat clicks
    quizContent.innerHTML = '';
    scoreBoard.style.display = "block";
    scoreCard.textContent = '';
    var scoreOl = document.querySelector("ol")

    //if local storage is empty, prints statement and returns nothing
    if (scoreList.length === 0) {
        scoreBoard.firstElementChild.textContent = 'There are no scores saved';
        return;
    } else {
        //Iterates through scores to create list
        for (let i = 0; i < scoreList.length; i++) {
            var scoreLi = document.createElement("li");
            scoreLi.textContent = scoreList[i];
            scoreOl.appendChild(scoreLi)
        }
    }
}
function clearLocal() {
    localStorage.clear();
    showHighScore();
}
function refreshPage() {
    location.reload()
}

function submitScore() {
    setLocal();
    showHighScore();
}
//Start quizz Timer
startBtn.addEventListener('click', quizStart)
//Checks if selected answer is correct
quizContent.addEventListener('click', answerCheck)
//assigns setlocal function to the 'save score' button
saveBtn.addEventListener('click', submitScore)
//attach high score list generation to anchor element
document.querySelector("a").addEventListener("click", showHighScore)
//Reloads to start
reloadBtn.addEventListener('click', refreshPage);
//Clears local storage
clearBtn.addEventListener('click', clearLocal)

