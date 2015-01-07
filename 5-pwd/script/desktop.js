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
      
      var headerLogo = document.createElement("img");
      headerLogo.setAttribute("src", "pics/cameraicon.png");
      headerLogo.setAttribute("id", "headerlogo");
      
      var headerText = document.createElement("p");
      headerText.innerHTML = "Image Viewer";
      
      var exitLogo = document.createElement("img");
      exitLogo.setAttribute("src", "pics/closewindow.png");
      exitLogo.setAttribute("id", "exitlogo");
      
      var myWindowBottom = document.createElement("div");
      myWindowBottom.setAttribute("id", "windowbottom");
      
      myWindowTop.appendChild(headerLogo);
      myWindowTop.appendChild(headerText);
      myWindowTop.appendChild(exitLogo);
      
      myWindow.appendChild(myWindowTop);
      myWindow.appendChild(myWindowBottom);
      
      myDesktop.appendChild(myWindow);
    },
    
};

window.onload = Desktop.init;