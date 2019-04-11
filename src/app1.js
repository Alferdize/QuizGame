function populate() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        // show options
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
};

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};


function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};

// create questions
var questions = [
    new Question("Which one is not an object oriented programming language?", ["Java", "C#","C++", "C"], "C"),
    new Question("Which language is used for styling web pages?", ["HTML", "JQuery", "CSS", "XML"], "CSS"),
    new Question("There are ____ main components of object oriented programming.", ["1", "6","2", "4"], "4"),
    new Question("Which language is used for web apps?", ["PHP", "Python", "Javascript", "All"], "All"),
    new Question("MVC is a ____.", ["Language", "Library", "Framework", "All"], "Framework"),
    new Question("Paging increases ______time?", ["Execution", "waiting","context switch", "All of the above"], "C"),
    new Question("In Unix which system call creates a new process?", ["fork", "new","creat", "exec"], "A"),
    new Question("Which system call returns process identifier of terminated child?", ["wait", "get","exit" , "fork"], "A"),
    new Question("Process stack does not contain?", ["return address", "PID of child process","local variable", "function parameter"], "B"),
    new Question("In UNIX the set of masked signals can be set or cleared using the____function?", ["sigpromask", "sigproc","sigmaskproc", "sigmask"], "A"),
    new Question("Which one is not an object oriented programming language?", ["Java", "C#","C++", "C"], "C"),


];

// create quiz
var quiz = new Quiz(questions);

// display quiz
populate();