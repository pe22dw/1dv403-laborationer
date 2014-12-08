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
    },
    
    generateTable: function() {
        
        
    
    },
};

window.onload = Memory.init;