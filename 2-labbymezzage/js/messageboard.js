"use strict";

var MessageBoard = {
  
    messages: [],
    messageCounter: 0,

    init: function() {
      
      var button = document.getElementById("button");
      button.onclick = MessageBoard.sendMessage;
      
      /* Gör så att det går att sända med enterknappen,
      byta rad med shift+enter och hindrar att markören 
      byter rad när meddelandet sänds med enterknappen */
      
      var pressEnter = document.getElementById("textarea");
      pressEnter.onkeypress = function(event) {
        
        if (event.keyCode === 13 && !event.shiftKey) {
          
          event.preventDefault();
          MessageBoard.sendMessage();
        }
      };
    },
    
    sendMessage: function() {
      
      // Skapar nya meddelandeobjekt, rensar textfältet, lägger till objekt i arrayen och håller koll på antalet meddelanden.
      
      var textInput = document.getElementById("textarea").value;
      document.getElementById("textarea").value = "";
      
      var mess = new Message(textInput, new Date());
      MessageBoard.messages.push(mess);
      
      MessageBoard.messageCounter += 1;
      document.getElementById("messagecounter").innerHTML = "Antal meddelanden: " + MessageBoard.messageCounter;
      
      var message = MessageBoard.messages.length-1;
      MessageBoard.renderMessage(message);
    },
    
    renderMessage: function(message) {
      
      // Skriver ut meddelanden med tillhörande ikoner och tidsstämpel.
      
      var board = document.getElementById("board");
      
      var messageHolder = document.createElement("div");
      
      var text = document.createElement("p");
      text.id = "text";
      text.innerHTML = MessageBoard.messages[message].getHTMLText();
      messageHolder.appendChild(text);
      
      var trash = document.createElement("img");
      trash.src = "pics/trash.png";
      trash.id = "trash";
      messageHolder.appendChild(trash);
      
      var clock = document.createElement("img");
      clock.src = "pics/clock.png";
      clock.id = "clock";
      messageHolder.appendChild(clock);
      
      var time = document.createElement("p");
      time.id = "time";
      time.innerHTML = MessageBoard.messages[message].getDateText();
      messageHolder.appendChild(time);
      
      board.appendChild(messageHolder);
      
      // Visar fullständigt datum för meddelande när användaren trycker på klockan.
      
      clock.onclick = function(){
        
       alert(MessageBoard.messages[message].getFullDate());
      };
      
      // Raderar meddelande från arrayen när användaren trycker på krysset.
      // Användaren får valet att bekräfta eller avbryta raderingen.
      
      trash.onclick = function(){
        
        if(confirm("Vill du verkligen radera meddelandet?")) 
        {
          MessageBoard.messages.splice(message, 1);
          MessageBoard.messageCounter -= 1;
          document.getElementById("messagecounter").innerHTML = "Antal meddelanden: " + MessageBoard.messageCounter;
          MessageBoard.renderMessages();
        }
      };  
    },
    
    renderMessages: function() {
    
      document.getElementById("board").innerHTML = "";
        
      for(var i = 0; i < MessageBoard.messages.length; i+=1) {
        
        MessageBoard.renderMessage(i);
      }
    }
};
 
window.onload = MessageBoard.init;

