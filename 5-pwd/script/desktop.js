"use strict";

var Desktop = {
    
    init: function() {
      
      Desktop.openWindow();  
    },
    
    createDesktop: function() {
        
        
    },
    
    openWindow: function() {
      
      var myWindow = document.createElement("div");
      myWindow.setAttribute("id", "window");
      
      var myWindowTop = document.createElement("div");
      myWindowTop.setAttribute("id", "windowtop");
      
      var headerText = document.createElement("p");
      headerText.innerHTML = "Hej Nisse";
      myWindowTop.appendChild(headerText);
      
      
      
      
      
      var myWindowBottom = document.createElement("div");
      myWindowBottom.setAttribute("id", "windowbottom");
      
      myWindow.appendChild(myWindowTop);
      myWindow.appendChild(myWindowBottom);
      
      
      var myDesktop = document.getElementById("desktop");
      
      myDesktop.appendChild(myWindow);
      
    },
    
};

window.onload = Desktop.init;