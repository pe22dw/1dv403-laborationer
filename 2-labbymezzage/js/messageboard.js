"use strict";

var MessageBoard = {
  
    messages: [],
    messageCounter: 0,

    init: function() {
      
      var button = document.getElementById("button");
      button.onclick = MessageBoard.sendMessage;
      
    },
    
    sendMessage: function() {
      
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
      
      var board = document.getElementById("board");
      
      var messageHolder = document.createElement("div");
      
      var text = document.createElement("p");
      text.id = "text";
      text.innerHTML = MessageBoard.messages[message].getHTMLText();
      messageHolder.appendChild(text);
      
      var time = document.createElement("p");
      time.id = "time";
      time.innerHTML = MessageBoard.messages[message].getDateText();
      messageHolder.appendChild(time);
      
      board.appendChild(messageHolder);
      
    },
    
    
    // Img taggen i a taggen..småbilder?
    
    
    
    
    renderMessages: function() {
    
      document.getElementById("board").innerHTML = "";
        
      for(var i = 0; i < MessageBoard.messages.length; i+=1) {
        
        MessageBoard.renderMessage(i);
      }
    }
};
 


window.onload = MessageBoard.init;

