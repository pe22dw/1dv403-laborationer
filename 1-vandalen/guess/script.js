"use strict";

window.onload = function(){
	
	var secret = Math.floor((Math.random() * 100) + 1);
	var guessCounter = 0;
	
	var guess = function(number){
		
		if(number >= 1 && number <= 100){
			
			guessCounter += 1;
			
			if(number > secret){
				
				return [false, "Det hemliga talet är lägre"];
			}
			else if(number < secret){
				
				return [false, "Det hemliga talet är högre"];
			}
			else{
				
				return [true, "Grattis du vann! Det hemliga talet var " + secret + " och du klarade det på " + guessCounter + " gissningar"];
			}
		}
		else{
			
			return [false, "Talet är utanför intervallet 1 - 100, försök igen!"];
		}
	}
	;
	
	// ------------------------------------------------------------------------------



	// Kod för att hantera utskrift och inmatning. Denna ska du inte behöva förändra
	var p = document.querySelector("#value"); // Referens till DOM-noden med id="#value"
	var input = document.querySelector("#number");
	var submit = document.querySelector("#send");

	// Vi kopplar en eventhanterare till formulärets skickaknapp som kör en anonym funktion.
	submit.addEventListener("click", function(e){
		e.preventDefault(); // Hindra formuläret från att skickas till servern. Vi hanterar allt på klienten.

		var answer = guess(input.value) // Läser in talet från textrutan och skickar till funktionen "guess"
		p.innerHTML = answer[1];		// Skriver ut texten från arrayen som skapats i funktionen.	

		if(answer[0] === true){				// Om spelet är slut, avaktivera knappen.
			submit.disabled = true;
		}
	
	});
};