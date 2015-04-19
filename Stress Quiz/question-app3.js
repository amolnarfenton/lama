function questionApp() {
  var avgScore = 0;
  var belowAvgScore = 0;
  var aboveAvgScore = 0;
  var currentQuestion = 1;
  var questionCount = Questions.question.length;
  var wrapper = document.getElementById("wrapper");
  var buttonDiv = document.getElementById("question-button");
  var answerArray = new Array(0);
  var tipArray = new Array(0);
  var avgAnswer;
  var belowAvgAnswer;
  var aboveAvgAnswer;
  
  var start = document.getElementById("start");
  start.setAttribute("disabled","disabled");
  document.getElementById("start").style.visibility = "hidden";
    document.getElementById("question-select").style.visibility = "visible";
//    document.getElementsByClassName("question-button").style.visibility = "visible";
    
  function checkAnswer(question,userAnswer,button) {
    console.log(userAnswer)
    var answerSplit = userAnswer.split("");
    var answerNumber = answerSplit[answerSplit.length-1];

    avgAnswer = question.average;
    belowAvgAnswer = question.belowAvg;
    aboveAvgAnswer = question.aboveAvg;


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
    wrapper.getElementsByClassName("content")[0].innerHTML = finalScore;
//    finalScore.getElementById("content").innterHTML = adviceText;
    finalScore.setAttribute("id","score");
    finalScore.className = "appear";

    for(j=0;j<3;j++) {

    if (answerArray[j] == answerArray[0]){

      //SLEEP TEST
      if (answerArray[0] == belowAvgAnswer){
        adviceText.innerHTML = "You should sleep more!";
      }
      else if (answerArray[0] == avgAnswer){
        adviceText.innerHTML = "Average amount of sleep";
      }
      else if (answerArray[0] == aboveAvgAnswer){
        adviceText.innerHTML = "Oversleeping can be a symptom of many health issues such as depression, sleep apnea or hyposomnia! You may want to talk to your doctor about this.";
      }
    }


    else if (answerArray[j] == answerArray[1]){
      //EXERCISE TEST
      if (answerArray[1] == belowAvgAnswer){
        adviceText.innerHTML = "You should exercise more";
      }
      else if (answerArray[1] == avgAnswer){
        adviceText.innerHTML = "Average amount of exercise!";
      }
      else if (answerArray[1] == aboveAvgAnswer){
        adviceText.innerHTML = "This is above average for exercising";
      }
    }
    

    else if (answerArray[j] == answerArray[2]){
      //PERSONAL TIME TEST
      if (answerArray[2] == belowAvgAnswer){
        adviceText.innerHTML = "You really need more personal time";
      }
      else if (answerArray[2] == avgAnswer){
        adviceText.innerHTML = "This is a good amount of personal time";
      }
      else if (answerArray[2] == aboveAvgAnswer){
        adviceText.innerHTML = "You got a lot of time on your hands";
      }
    }
    }

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
    
    var button = document.createElement("button");
    // buttonDiv.innerHTML = "";
    buttonDiv.removeChild(buttonDiv.firstChild);
    buttonDiv.appendChild(button);
//    questionDiv.getElementById("button").innerHTML = button;
    var label = document.createTextNode("Submit");
    button.appendChild(label);
    button.setAttribute("id", "button"+currentQuestion);
    
//    questionDiv.className = "appear";
        
    var currentButton = button;
//      document.getElementById("button"+currentQuestion);
    
    currentButton.addEventListener('click', function(){checkAnswer(selectedQuestion,questionSelect.value,currentButton);}, false);
  }
  
  generateQuestion();
  
  
}