"use strict";

var Desktop = {
  
    clickCounter: 0,
    imageDivWidth: 0,
    imageDivHeight: 0,
    
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
      
      Desktop.clickCounter += 1;
      
      if(Desktop.clickCounter === 1)
      {
      
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
        
        myDesktop.appendChild(myWindowTop);
        myDesktop.appendChild(myWindowBottom);
        
        myDesktop.appendChild(myWindow);
        
        Desktop.getImages();
        
        exitLogo.addEventListener("click", function() {
        
          Desktop.closeWindow()}, false);
      }
      else
      {
        Desktop.closeWindow();
      }
    },

    closeWindow: function() {
      
      document.getElementById("buttonclicked").setAttribute("id", "button");
      document.getElementById("window").setAttribute("id", "closewindow");
      document.getElementById("windowtop").setAttribute("id", "closewindow");
      document.getElementById("windowbottom").setAttribute("id", "closewindow");
      
      Desktop.clickCounter = 0;
    },
    
    
    getImages: function() {
      
      var xhr = new XMLHttpRequest();
        
        xhr.onreadystatechange = function() {
    
            if (xhr.readyState === 4)
            {
                if (xhr.status === 200)
                {
                    var responseText = JSON.parse(xhr.responseText);
                    
                    for (var j = 0; j < responseText.length; j += 1)
                      {
                        var width = responseText[j].thumbWidth;
                        var height= responseText[j].thumbHeight;
                        console.log(width);
                        console.log(height);
                      
                        if (Desktop.imageDivWidth < width)
                        {
                          Desktop.imageDivWidth = width;
                        }
                        if (Desktop.imageDivHeight < height)
                        {
                          Desktop.imageDivHeight = height;
                        }
                      }
                      
                    
                    for (var i = 0; i < responseText.length; i += 1)
                    {
                      var imageDiv = document.createElement("div");
                      imageDiv.setAttribute("id", "imagediv");
                      imageDiv.style.width = "75px";
                      imageDiv.style.height = "50px";
                      
                      var img = document.createElement("img");
                      img.setAttribute("src", responseText[i].thumbURL);
                      
                      imageDiv.appendChild(img);
                      document.getElementById("window").appendChild(imageDiv);
                    }
                    
                }
                else
                {
                    alert("Läsfel, status:"+xhr.status);
                }
            }
            
        };
    
        xhr.open("GET", "http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/", true);
        xhr.send(null);
    
    
    },
  
};

window.onload = Desktop.init;