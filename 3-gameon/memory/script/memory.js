"use strict";

var Memory = {
    
    myArray: [],
    
    rows: 4,
    cols: 4,
    
    
    init: function() {
        
        var random = new RandomGenerator.getPictureArray(Memory.rows, Memory.cols);
        
        for (var i = 0; i < random.length; i += 1) {
            
            var picture = "pics/" + random[i] + ".png";
            Memory.myArray.push(picture);
        }
        
        Memory.generateTable(Memory.rows, Memory.cols);
    },
    
    generateTable: function(rows, cols) {
        
        var theGame = document.getElementById("thegame");
        
        var myTable = document.createElement("table");
        myTable.border = "1";
        
        var myTableBody = document.createElement("tbody");
        myTable.appendChild(myTableBody);
        
        theGame.appendChild(myTable);
        
        for (var i = 0; i < rows; i += 1) {
            
            var tableRow = document.createElement("tr");
            
            for (var j = 0; j < cols; j += 1) {
                
                var tableCol = document.createElement("td");
                tableRow.appendChild(tableCol);
            }
            
            myTableBody.appendChild(tableRow);
        }
    },
};

window.onload = Memory.init;