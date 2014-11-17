"use strict";

window.onload = function(){

	
	var birthday = function(date){
		
		var birthDate = new Date(date);
		var currentDate = new Date();
		var daysUntil = 0;
		
		// Hittade efter mycket letande till slut denna lösning för formatet på datumet.
		// Den verkar även fixa skottår? Hur?
		if (date.length !== 10 || date.charAt(4) !== "-" || date.charAt(7) !== "-") {
			
			throw new Error("Skriv datumet i formen ÅÅÅÅ-MM-DD");
		}

		birthDate.setFullYear(currentDate.getFullYear());
		
		if(currentDate > birthDate) {
			
			birthDate.setFullYear(currentDate.getFullYear()+1);
		}
		
		daysUntil = Math.ceil((birthDate.getTime() - currentDate.getTime()) / (1000*60*60*24));
		
		if (daysUntil === 365) {
			
			return 0;
		}
		else if (daysUntil === 366) {
			
			return 1;
		}
		
		return daysUntil;
	};
	// ------------------------------------------------------------------------------


	// Kod för att hantera utskrift och inmatning. Denna ska du inte behöva förändra
	var p = document.querySelector("#value"); // Referens till DOM-noden med id="#value"
	var input = document.querySelector("#string");
	var submit = document.querySelector("#send");

	// Vi kopplar en eventhanterare till formulärets skickaknapp som kör en anonym funktion.
	submit.addEventListener("click", function(e){
		e.preventDefault(); // Hindra formuläret från att skickas till servern. Vi hanterar allt på klienten.

		p.classList.remove( "error");

		try {
			var answer = birthday(input.value) // Läser in texten från textrutan och skickar till funktionen "convertString"
			var message;
			switch (answer){
				case 0: message = "Grattis på födelsedagen!";
					break;
				case 1: message = "Du fyller år imorgon!";
					break;
				default: message = "Du fyller år om " + answer + " dagar";
					break;
			}

			p.innerHTML = message;
		} catch (error){
			p.classList.add( "error"); // Växla CSS-klass, IE10+
			p.innerHTML = error.message;
		}
	
	});



};