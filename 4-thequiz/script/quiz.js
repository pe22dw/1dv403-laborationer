"use strict";

var Quiz = {
    
    url: "http://vhost3.lnu.se:20080/question/1",
    
    guessCounter: [0,0,0,0,0],
    questionCounter: 0,
    
    init: function() {
        
        Quiz.getQuestion();
    },
    
    getQuestion: function() {
        
        var xhr = new XMLHttpRequest();
        
        xhr.onreadystatechange = function() {
    
            if (xhr.readyState === 4)
            {
                if (xhr.status === 200)
                {
                    var responseText = JSON.parse(xhr.responseText);
                    
                    var questionArea = document.getElementById("questionarea");
                    var p = document.createElement("p");
                    p.innerHTML = responseText.question;
                    questionArea.appendChild(p);
                    
                    Quiz.url = responseText.nextURL;
                
                    var button = document.getElementById("button");
        
                    button.onclick = function() {
                        
                        Quiz.postAnswer(responseText);
                    };
                }
                else
                {
                    alert("Läsfel, status:"+xhr.status);
                }
            }
        };
    
        xhr.open("GET", Quiz.url, true);
        xhr.send(null);
    },  
    
    postAnswer: function(responseText) {
        
        var xhr = new XMLHttpRequest();
        
        xhr.onreadystatechange = function() {
    
            if (xhr.readyState === 4)
            {
                if (xhr.status === 200)
                {
                    Quiz.guessCounter[Quiz.questionCounter] += 1;
                    var responseText2 = JSON.parse(xhr.responseText);
                    Quiz.url = responseText2.nextURL;
                    
                    Quiz.questionCounter += 1;
                    
                    if(Quiz.questionCounter > 4)
                    {
                        alert("Spelet är slut!\nAntal gissningar:\nFråga 1 - " + Quiz.guessCounter[0] + "\nFråga 2 - " + Quiz.guessCounter[1] + "\nFråga 3 - " + Quiz.guessCounter[2] + "\nFråga 4 - " + Quiz.guessCounter[3] + "\nFråga 5 - " + Quiz.guessCounter[4]);
                    }
                    else
                    {
                        Quiz.getQuestion();
                    }
                }
                else
                {
                    Quiz.guessCounter[Quiz.questionCounter] += 1;
                    alert("Du svarade tyvärr fel! Försök igen!");
                }
            }
        };
        
        xhr.open("POST", Quiz.url, true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        
        var answer = document.getElementById("answer").value;
        
        var theanswer = {
            
          answer: answer,
        };
        
        xhr.send(JSON.stringify(theanswer));
    },
    
    
};

window.onload = Quiz.init;










