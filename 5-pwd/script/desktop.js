"use strict";

var Desktop = {
  
    clickCounter: 0,
    imageDivWidth: 0,
    imageDivHeight: 0,
    imageId: 0,
    background: [],
    
    init: function() {
      
      Desktop.createDesktop();
    },
    
    createDesktop: function() {
      
      var myContainer = document.getElementById("container");  
        
      var myDesktop = document.createElement("div");
      myDesktop.setAttribute("id", "desktop");
      myDesktop.style.background = "url('pics/desktopwood.jpg')";
      
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
    
    getImages: function() {
      
      var xhr = new XMLHttpRequest();
        
        var loading = document.createElement("img");
        loading.setAttribute("src", "pics/loader.gif");
        loading.setAttribute("id", "active");
        
        document.getElementById("windowbottom").appendChild(loading);
        
        xhr.onreadystatechange = function() {
    
            if (xhr.readyState === 4)
            {
                if (xhr.status === 200)
                {
                    loading.setAttribute("id", "inactive");
                    
                    var responseText = JSON.parse(xhr.responseText);
                    
                    for (var t = 0; t < responseText.length; t += 1)
                    {
                      var width = responseText[t].thumbWidth;
                      var height= responseText[t].thumbHeight;
                      Desktop.findLargestImage(width, height);
                      
                      var thumbUrl = responseText[t].thumbURL;
                      Desktop.createImageCollection(thumbUrl);
                      
                      Desktop.background.push(responseText[t].URL);
                    }
                }
                else
                {
                    loading.setAttribute("id", "inactive");
                    alert("Läsfel, status:"+xhr.status);
                }
            }
        };
    
        xhr.open("GET", "http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/", true);
        xhr.send(null);
    },
    
    findLargestImage: function(width, height) {
      
        if (Desktop.imageDivWidth < width)
        {
          Desktop.imageDivWidth = width;
        }
        if (Desktop.imageDivHeight < height)
        {
          Desktop.imageDivHeight = height;
        }
    },
    
    createImageCollection: function(thumbUrl) {
      
        var imageDiv = document.createElement("div");
        imageDiv.setAttribute("id", "imagediv");
        imageDiv.style.width = Desktop.imageDivWidth + "px";
        imageDiv.style.height = Desktop.imageDivHeight + "px";
                      
        var a = document.createElement("a");
        a.setAttribute("href", "#");
                   
        Desktop.imageId += 1;   
        
        var img = document.createElement("img");
        img.setAttribute("src", thumbUrl);
        img.setAttribute("id", Desktop.imageId);
                     
        a.appendChild(img);
        imageDiv.appendChild(a);
        document.getElementById("window").appendChild(imageDiv);
        
        a.onclick = function () {
            
            Desktop.changeBackground(img.id);
        }; 
    },
    
    changeBackground: function(imageId) {
      
      var newDesktop = document.getElementById("desktop");
      newDesktop.style.background = "url("+Desktop.background[imageId-1]+")";
    },
    
    closeWindow: function() {
      
      document.getElementById("buttonclicked").setAttribute("id", "button");
      document.getElementById("window").setAttribute("id", "closewindow");
      document.getElementById("windowtop").setAttribute("id", "closewindow");
      document.getElementById("windowbottom").setAttribute("id", "closewindow");
      
      Desktop.clickCounter = 0;
      Desktop.imageId = 0;
    },
};

window.onload = Desktop.init;