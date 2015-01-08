"use strict";

var Quiz = {
    
    // Aktuell url att använda.
    url: "http://vhost3.lnu.se:20080/question/1",
    
    // Håller reda på antal gissningar på varje fråga.
    guessCounter: [0],
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
                    // Om hämtning går bra, skriv ut frågan i en p-tagg.
                    var responseText = JSON.parse(xhr.responseText);
                    
                    var questionArea = document.getElementById("questionarea");
                    var p = document.createElement("p");
                    p.innerHTML = responseText.question;
                    questionArea.appendChild(p);
                    
                    // Ändra aktuell url till där nästa fråga ligger.
                    Quiz.url = responseText.nextURL;
                
                    // Knapp för att skicka svaret i textrutan.
                    var button = document.getElementById("button");
                    button.onclick = function() {
                        
                        Quiz.postAnswer();
                    };
                }
                else
                {
                    // Om hämtning inte går bra, skriv ut felmeddelande.
                    alert("Läsfel, status:"+xhr.status);
                }
            }
        };
    
        // Öppnar upp tillgång till aktuell url för hämtning.
        xhr.open("GET", Quiz.url, true);
        // Skickar "inget" för att kunna få ett svar tillbaka.
        xhr.send(null);
    },  
    
    postAnswer: function() {
        
        var xhr = new XMLHttpRequest();
        
        xhr.onreadystatechange = function() {
    
            if (xhr.readyState === 4)
            {
                if (xhr.status === 200)
                {
                    // Om hämtning går bra så är svaret rätt.
                    // ökar gissningsräknaren på aktuell fråga med 1.
                    // Arrayen för gissningar utökas efter behov.
                    Quiz.guessCounter.push(0);
                    Quiz.guessCounter[Quiz.questionCounter] += 1;
                
                    // Ändra aktuell url till där nästa fråga ligger.
                    var responseText2 = JSON.parse(xhr.responseText);
                    Quiz.url = responseText2.nextURL;
                    
                    // Öka frågeräknaren med 1.
                    Quiz.questionCounter += 1;
                    
                    // Om frågeräknaren är mer än 4 så är spelet slut, annars hämtas ny fråga.
                    if(!responseText2.nextURL)
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
                    // Om hämtning inte går bra så är svaret fel, skriver ut felmeddelande.
                    // Ökar gissningsräknaren på aktuell fråga med 1.
                    Quiz.guessCounter[Quiz.questionCounter] += 1;
                    alert("Du svarade tyvärr fel! Försök igen!");
                }
            }
        };
        
        // Öppnar upp tillgång till aktuell url för postning.
        xhr.open("POST", Quiz.url, true);
        
        // Sätter formattyp på begäran för post.
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        
        // Hämtar ut det skrivna svaret i textrutan till en variabel.
        var answer = document.getElementById("answer").value;
        
        // Gör om det skrivna svaret från textrutan till ett objekt.
        var theanswer = {
            
          answer: answer,
        };
        
        // Skickar det skrivna svaret i JSON-format.
        xhr.send(JSON.stringify(theanswer));
    },
};

window.onload = Quiz.init;










