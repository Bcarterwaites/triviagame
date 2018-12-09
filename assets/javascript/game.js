   //Global Variables

    // Background Music
    var music = new Audio("assets/audio/themesong.mp3")
    // Counters
    var triviaTime = 0;
    var timer = '';
    var correctAnswer = 0;
    var incorrectAnswer = 0;
    var qCounter = 1;

    var questions = [
     {
        question: "What were Ed Edd and Eddy always scamming the neighboor kids for?",
        choices: ["Jawbreakers", "Gummy Bears", "Chocolate", "Peppermints"],
        correctChoice: "Jawbreakers",
        rightMessage: "Correcto Mundo!",
        wrongMessage: "Nah bruh"
        
     },

     {
         question: "Ed has a tub of?",
         choices: ["Butter", "Sour Cream", "Milk", "Gravy"],
         correctChoice: "Gravy"
    },

    {
        question: "This characters bestfriend was a 2x4 named Plank",
        choices: ["Kevin", "Rolf", "Johnny", "Naz"],    
        correctChoice: "Johnny"
    },

    { question: "Eddy keeps what underneath is bed",
      choices: ["Magazines", "Money", "Jawbreakers", "Stuff Animals"],
      correctChoice: "Magazines"

    },

    { question: "What was the school Ed, Edd and Eddy go to?",
      choices: ["Abe Lincoln Jr. High", "Peach Creak Jr. High", "Brett Farve Jr.High", "Brad Pitt Jr. High"],
      correctChoice: "Peach Creak Jr. High"  
    }];




// Start button foo


var start = function() {
    //When button is clicked clear gane area
    $(".btn").on("click", function() {
        //empties game area
        $(".gameArea").empty()
        music.play();
        displayQuestions();
    });
}

var displayQuestions = function() {
    timerStart();
    // Gets question from array 
    var getQuestion = questions[qCounter]["question"];
    // assign div element to post in #questions div
    var newDiv = $("<div>");
    // add class to div 
    newDiv.addClass("question");
    // Displaying question text
    newDiv.text(getQuestion)
    // Display questions on the DOM
    $(".gameArea").append(newDiv)
    displayAnswer();
}

var displayAnswer = function() {
    var answerLength = questions[qCounter]["choices"].length;
    for (var i = 0; i < answerLength; i++) {
        // Get answers from array
        var getAnswers = questions[qCounter]["choices"][i];
        // Creating a div to turn answers into buttons
        var choiceBtn = $("<button>")
        // Adding a class to the div
        choiceBtn.addClass("choices redBtn");
        // Add the attribute which contains the choices
        choiceBtn.attr("data-type", getAnswers);
        //add text to new dive
        choiceBtn.text(getAnswers)
        // Display answers on the DOM
        $(".gameArea").append(choiceBtn);
    }


// Stops click event from being saved
$(document).off("click",".choices",checkAnswer);
$(document).on("click",".choices",checkAnswer);

};

var checkAnswer = function () {
    // Gets users choice
    var userChoice = $(this).data("type")
    var rightChoice = questions[qCounter]["correctCboice"]
    
    var right = questions[qCounter]["rightMessage"]
    var wrong = questions[qCounter]["wrongMessage"]

    if (userChoice === rightChoice) {
        // Increment correctAnswer by 1
        correctAnswer++;
        // Empties out gameArea
        $(".gameArea").empty();
        // Create a new div to display with correct message
        var newDiv = $("<div>");
        // Give div a class
        newDiv.addClass("rightChoice")
        // Add text to div 
        newDiv.text(right);
        // Add answer to DOM
        $(".gameArea").append(newDiv);
        // Stops time
        clearInterval(timer)
        // Add 1 to question count to move to the next question
        qCounter++;
        if (qCounter <= 4) {
            // Removes the text for correct answer and generates new question
            setTimeout(
                function () {
                    $(".gameArea").empty();
                    displayQuestions()
                }, 3500)
        } else {
            $(".gameArea").empty();
            // Create a new div 
            var newDiv = $("<div>");
            // Give div a class
            newDiv.addClass("rightChoice");
            // adds correct message to div
            newDiv.text(right)
            // Add answer to DOM
            $(".gameArea").append(newDiv);
            // Stop time
            clearInterval(timer)
            //Reset
            setTimeout(gameOver, 3500)
        }
    }
    else {
        incorrectAnswer++; 
        //Clears game Area
        $(".gameArea").empty();
        // Create new div
        var newDiv = $("<div>");
        //Give div class
        newDiv.addClass("wrongChoice")
        //Adds wrong message text to div
        newDiv.text(wrong);
        //Add answer to DOM
        $(".gameArea").append(newDiv);
        //Stops time
        clearInterval(timer);
        //Add 1 question count to move to next question
        qCounter++;

        if(qCounter <= 4) {
            setTimeout(function() {
                $(".gameArea").empty();
                displayQuestions();
            }, 3500);
        } else {
            //Clears game Area
            $(".gameArea").empty();
            //create new div
            var newDiv = $("<div>");
            //Give div a class
            newDiv.addClass("wrongChoice");
            //adds wrong text to div
            newDiv.text(wrong);
            //add answer to DOM
            $(".gameArea").append(newDiv);
            //Stops time
            clearInterval(timer)
            //Reset
            setTimeout(gameOver, 3500);
    
    } 
  }    
  }

  // Timer

var timerStart = function() {
    $(".Timer").empty();
    //sets time to 15
    var triviaTime = 150;
    //Create new div 
    var timeTag = $("<div>");
    // Add class to div
    timeTag.addClass("time")
    timeTag.addClass("progress");
    var progressBar = $("<div>");
    progressBar.addClass("progress-bar");
    progressBar.width(triviaTime + "%");

    $(".Timer").append(timeTag);
    $(".time").append(progressBar)
    // Decrement Time
    timer = setInterval(timeDecrement, 150)
};

var timeDecrement = function() {
    triviaTime--;
    //If time gets to 0
    if (triviaTime === -15){
        userChoice = false;
        //Clears time
        clearInterval(timer)
        checkAnswer();

}

}

var gameOver = function() {
    //Remove everything in gameArea
    $(".gameArea").empty();
    //Remove everything in timer class
    $(".Timer").empty();
    var scoreDiv = $("<div>");
    scoreDiv.addClass("score")
    scoreDiv.html("Correct: " + correctAnswer + '<br>' + 'Wrong: ' + incorrectAnswer);
    $(".gameArea").append(scoreDiv);
    //Assign new div element to new Div
    var newDiv = $("<div>");
    //add class to new Div
    newDiv.addClass("gameOver");
    //add game over text
    newDiv.text('Game Over!! Try again??')
    //Append game over text to dom
    $(".gameArea").append(newDiv);
    //Create a reset button
    var resetBtn = $("<button>");
    //give button a class
    resetBtn.addClass("redBtn resetBtn");
    //Give button reset text
    resetBtn.text("Reset");
    //Append reset button to div
    $(".gameArea").append(resetBtn);
    //Reset all values
    triviaTime = 150;
    qCounter = 1;
    correctAnswer = 0;
    incorrectAnswer = 0;
    //Event for when reset button is pressed
    $(".resetBtn").on("click", function() {
        $(".gameArea").empty()
        //Starts game over
        displayQuestions();
    });
};


//Start it up

start();




//var timeRemaining = function() {
    //Decrement time by 1
   // time--;
    // Prints time remaining
    //$(".timeCountDown").text(time + "seconds")
    //console.log(time)

    //if ( time === 0) {
        // Stops timer from going beyond 0
       // clearInterval(interval);
        //Removes button answers
       // $("button").remove();
        //Removes question


        
