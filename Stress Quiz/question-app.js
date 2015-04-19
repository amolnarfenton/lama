function questionApp() {
  var avgScore = 0;
  var belowAvgScore = 0;
  var aboveAvgScore = 0;
  var currentQuestion = 1;
  var questionCount = Questions.question.length;
  var wrapper = document.getElementById("wrapper");
  var answerArray = new Array(3);
  
  var start = document.getElementById("start");
  start.setAttribute("disabled","disabled");
  
  function checkAnswer(question,userAnswer,button) {
    var answerSplit = userAnswer.split("");
    var answerNumber = answerSplit[answerSplit.length-1];
    var avgAnswer = question.average;
    var belowAvgAnswer = question.belowAvg;
    var aboveAvgAnswer = question.aboveAvg;
    if(answerNumber == avgAnswer) {
      avgScore++;
    } else if (answerNumber == belowAvgAnswer) {
      belowAvgScore++;
    } else if (answerNumber == aboveAvgAnswer){
      aboveAvgScore++;
    }
    //PUTTING ANSWERS INTO ARRAY
    answerArray.push(answerNumber);

    
    button.setAttribute("disabled","disabled");
            
    if(currentQuestion === questionCount) {
      finalScore();
    } else {
      var qDiv = wrapper.lastChild;
      qDiv.className = "disappear";
      currentQuestion++;
      generateQuestion();
    }
  }
  
  function finalScore() {
    var finalScore = document.createElement("div");
    var adviceText = document.createElement("h1");
    wrapper.appendChild(finalScore);
    finalScore.appendChild(adviceText);
    finalScore.setAttribute("id","score");
    finalScore.className = "appear";

    //SLEEP TEST
    if (answerArray[0] == belowAvgAnswer){
      adviceText.innerHTML = "You should sleep more!";
    }
    else if (answerArray[10] == avgAnswer){
      adviceText.innerHTML = "Average amount of sleep";
    }

    //finalScoreText.innerHTML = "Your final stress level is " + score + " out of " + questionCount +", I know exactly what you need right now...";
    
    var resetButton = document.createElement("button");
    finalScore.appendChild(resetButton);
    var resetLabel = document.createTextNode("Let's try this again...");
    resetButton.appendChild(resetLabel);
    resetButton.setAttribute("id","reset")
    resetButton.addEventListener('click', function(){reset();}, false);
  }
  
  function reset() {
    while(wrapper.lastChild && wrapper.lastChild.tagName === "DIV") {
      wrapper.removeChild(wrapper.lastChild);
    }
    questionApp();
  }
  
  function generateQuestion() {
    var selectedQuestion = Questions.question[currentQuestion-1];
    var questionDiv = document.createElement("div");
    questionDiv.setAttribute("id", "question"+currentQuestion);
    var questionTitle = document.createElement("h2");
    var questionSelect = document.createElement("select");
    
    
    wrapper.appendChild(questionDiv);
    questionDiv.appendChild(questionTitle);
    questionTitle.innerHTML = "Question " + currentQuestion + ": " + selectedQuestion.question;
    questionDiv.appendChild(questionSelect);
    
    for(j=1;j<=3;j++) {
      var choice = "selectedQuestion.choice" + j;
      var choiceOption = document.createElement("option");
      choiceOption.setAttribute("value", "choice"+j);
      choiceOption.innerHTML = eval(choice);
      questionSelect.appendChild(choiceOption);
    }
    var initialChoice = document.createElement("option");
    initialChoice.innerHTML = "&lt;&lt; Click to choose &gt;&gt;";
    initialChoice.setAttribute("selected","selected");
    questionSelect.appendChild(initialChoice);
    
    var button = document.createElement("button");
    questionDiv.appendChild(button);
    var label = document.createTextNode("ANSWER!");
    button.appendChild(label);
    button.setAttribute("id", "button"+currentQuestion);
    
    questionDiv.className = "appear";
        
    var currentButton = document.getElementById("button"+currentQuestion);
    
    currentButton.addEventListener('click', function(){checkAnswer(selectedQuestion,questionSelect.value,currentButton);}, false);
  }
  
  generateQuestion();
  
  
}