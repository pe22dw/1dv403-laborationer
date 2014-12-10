"use strict";

var Memory = {
    
    myArray: [],
    
    rows: 4,
    cols: 4,
    
    oneFlipCounter: 0, // Håller reda på när två ikoner har tryckts på.
    totalCounter: 0, // Håller reda på det totala antaldet gissningar.
    latest: 0, // Håller reda på den senast gissade ikonen.
    correctCounter: 0, // Håller reda på antalet avklarade matchningar av ikoner.
   
    
    init: function() {
        
        var random = new RandomGenerator.getPictureArray(Memory.rows, Memory.cols);
        
        for (var i = 0; i < random.length; i += 1) {
            
            var picture = "memory/pics/" + "memory" + random[i] + ".png";
            Memory.myArray.push(picture);
        }
        
        Memory.generateTable();
    },
    
    generateTable: function() {
        
        var iconId = 0;
        
        var gameArea = document.getElementById("gamearea");
        
        var myTable = document.createElement("table");
        myTable.border = "1";
        
        var myTableBody = document.createElement("tbody");
        myTable.appendChild(myTableBody);
        
        for (var i = 0; i < Memory.rows; i += 1) {
            
            var tableRow = document.createElement("tr");
            
            for (var j = 0; j < Memory.cols; j += 1) {
                
                tableRow.appendChild(Memory.createTableCol(iconId));
                iconId += 1;
            }
            
            myTableBody.appendChild(tableRow);
        }
        
        gameArea.appendChild(myTable);
    },
    
    createTableCol: function(iconId) {
        
        var tableCol = document.createElement("td");
                
        var icon = document.createElement("img");
        icon.setAttribute("src", "memory/pics/memory0.png");
        icon.setAttribute("width", "100px");
        icon.setAttribute("id", iconId);
                
        var a = document.createElement("a");
        a.setAttribute("href", "#");
                
        a.appendChild(icon);
        tableCol.appendChild(a);
        
        a.onclick = function () {
            
            Memory.flipIcon(iconId);
        };
        
        return tableCol;
    },
    
    flipIcon: function(iconId) {
        
        var icon = document.getElementById(iconId);
        
        if (icon.getAttribute("src") === "memory/pics/memory0.png") {
            
            icon.setAttribute("src", Memory.myArray[iconId]);
            Memory.oneFlipCounter += 1;
        }
        
        if (Memory.oneFlipCounter === 2) {
            
            Memory.totalCounter += 1;
            
            if (Memory.myArray[Memory.latest] != Memory.myArray[iconId]){
                
                setTimeout(function() {
                    
                    document.getElementById(Memory.latest).setAttribute("src", "memory/pics/memory0.png");
                    icon.setAttribute("src", "memory/pics/memory0.png");
                    
                }, 400);
                
            }
            
            else {
                
                Memory.correctCounter += 1;
            }
            
            Memory.oneFlipCounter = 0;
        }
            
        else {
            
            Memory.latest = iconId;
        }
        
        if (Memory.correctCounter === Memory.myArray.length / 2) {
            
            var gameStats = document.getElementById("gamestats");
            var text = document.createElement("p");
            text.innerHTML = "Grattis, du klarade det på " + Memory.totalCounter + " gissningar!";
            
            gameStats.appendChild(text);
            
        }
        
        
        
    },
};

window.onload = Memory.init;