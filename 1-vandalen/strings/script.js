"use strict";

window.onload = function(){

	var convertString = function(str){
		
		if (str) {
			
			var newString = ("");
			var i = 0;
			
			for (i = 0; i < str.length; i+= 1) {

 // Ingen optimal lösning eftersom jag inte matchar å,ä,ö och andra specialtecken. hade varit bättre med typ "if char is lowercase ändra till upper etc.."
 
				if (str.charAt(i).match(/^[A-Z]/)) {
					newString += str.charAt(i).toLowerCase().replace(/a/g, "#");
				} 
				else {
					newString += str.charAt(i).toUpperCase().replace(/A/g, "#");
				}
			}
			return newString;
		}
		else {
			
			throw Error("Vänligen gör om och gör rätt, dvs. skriv något i rutan!");
		}
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
			var answer = convertString(input.value) // Läser in texten från textrutan och skickar till funktionen "convertString"
			p.innerHTML = answer;		// Skriver ut texten från arrayen som skapats i funktionen.	
		} catch (error){
			p.classList.add( "error"); // Växla CSS-klass, IE10+
			p.innerHTML = error.message;
		}
	
	});



};