function questionApp() {
  var avgScore = 0;
  var belowAvgScore = 0;
  var aboveAvgScore = 0;
  var currentQuestion = 1;
  var questionCount = Questions.question.length;
  var wrapper = document.getElementById("wrapper");
  var answerArray = new Array(0);
  
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
      console.log(answerArray);
    
//    button.setAttribute("disabled","disabled");
            
    if(currentQuestion == questionCount) {
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
    wrapper.getElementById("content").innerHTML = finalScore;
    finalScore.getElementById("h1").innterHTML = adviceText;
    finalScore.setAttribute("id","score");
    finalScore.className = "appear";

    //SLEEP TEST
    if (answerArray[0] == belowAvgAnswer){
      adviceText.innerHTML = "You should sleep more!";
    }
    else if (answerArray[0] == avgAnswer){
      adviceText.innerHTML = "Average amount of sleep";
    }

    //finalScoreText.innerHTML = "Your final stress level is " + score + " out of " + questionCount +", I know exactly what you need right now...";
    
    var resetButton = document.createElement("button");
    finalScore.getElementById("button").innerHTML = resetButton;
    var resetLabel = document.createTextNode("Let's try this again...");
    resetButton.getElementById("button").innerHTML = resetLabel;
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
    var selectedQuestion = Questions.question[currentQuestion-1]; //
    
//      var questionDiv = document.createElement("div");
    var questionDiv = document.getElementsByClassName("content");
    questionDiv[0].setAttribute("id", "question"+currentQuestion);
      var questionTitle = document.getElementById("question-name");
    var questionSelect = document.getElementById("question-select");

    
    
//    wrapper.getElementById("div").innerHTML = questionDiv;
//    questionDiv.getElementById("h2").innerHTML = questionTitle;
    questionTitle.innerHTML = "Question " + currentQuestion + ": " + selectedQuestion.question;
//    questionDiv.getElementById("select").innerHTML = questionSelect;
    
    for(j=1;j<=3;j++) {
      var choice = "selectedQuestion.choice" + j;
      var choiceOption = document.getElementById("option-"+j);
      choiceOption.setAttribute("value", "choice"+j);
      choiceOption.innerHTML = eval(choice);
//      questionSelect.getElementById("option").innerHTML = choiceOption;
    }
    var initialChoice = document.getElementById("option-4");
    initialChoice.innerHTML = "&lt;&lt; Click to choose &gt;&gt;";
    initialChoice.setAttribute("selected","selected");
//    questionSelect.getElementById("option").innerHTML = initialChoice;
    
    var button = document.getElementsByClassName("question-button");
//    questionDiv.getElementById("button").innerHTML = button;
//    var label = document.createTextNode("Submit");
//    button[0].innerHTML = label;
    button[0].setAttribute("id", "button"+currentQuestion);
    
//    questionDiv.className = "appear";
        
    var currentButton = button[0];
//      document.getElementById("button"+currentQuestion);
    
    button[0].addEventListener('click', function(){checkAnswer(selectedQuestion,questionSelect.value,currentButton);}, false);
  }
  
  generateQuestion();
  
  
}