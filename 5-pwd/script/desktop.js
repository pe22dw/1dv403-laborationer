"use strict";

var Desktop = {
    
    init: function() {
      
      Desktop.createDesktop();
    },
    
    createDesktop: function() {
      
      var myContainer = document.getElementById("container");  
        
      var myDesktop = document.createElement("div");
      myDesktop.setAttribute("id", "desktop");
      
      var myButton = document.createElement("div");
      myButton.setAttribute("id", "button");
      
      myDesktop.appendChild(myButton);
      
      myContainer.appendChild(myDesktop);
     
      myButton.addEventListener("click", function() {
        myButton.setAttribute("id", "buttonclicked");
        Desktop.openWindow(myDesktop)}, false);
    },
    
    openWindow: function(myDesktop) {
      
      var myWindow = document.createElement("div");
      myWindow.setAttribute("id", "window");
      
      var myWindowTop = document.createElement("div");
      myWindowTop.setAttribute("id", "windowtop");
      
      var headerText = document.createElement("p");
      headerText.innerHTML = "Image Viewer";
      myWindowTop.appendChild(headerText);
      
      var myWindowBottom = document.createElement("div");
      myWindowBottom.setAttribute("id", "windowbottom");
      
      myWindow.appendChild(myWindowTop);
      myWindow.appendChild(myWindowBottom);
      
      myDesktop.appendChild(myWindow);
    },
    
};

window.onload = Desktop.init;