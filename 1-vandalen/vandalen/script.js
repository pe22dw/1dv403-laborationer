"use strict";

var makePerson = function(persArr){


    // Skapar resultatobjektet som senare ska returneras.

    var resultObject = {
    	minAge: 0,
    	maxAge: 0,
    	averageAge: 0,
    	names: ""
    };

    // Skapar variabler.

    var arrAges = 0,
        sumOfAges = 0,
        arrNames = "";

        
    // Tilldelar en variabel alla åldrar från arrayen.

    arrAges = persArr.map(function(item) {
        
        return item.age;
    });
    
    
    // Sorterar åldrar, hittar lägsta, högsta samt räknar ut medelåldern.
    // Tilldelar dessa till resultatobjektet.
 
    arrAges.sort(); // Funkar inte så bra på nummer, kan då använda som i liknande sort längre ner fast med return a - b;
    
    resultObject.minAge = arrAges[0];
    resultObject.maxAge = arrAges[arrAges.length -1];
    
    for (var age in arrAges) {
        
        sumOfAges += arrAges[age];
    }
    
    resultObject.averageAge = Math.round(sumOfAges / arrAges.length);
    
    
    // Tilldelar en variabel alla namn från arrayen.
    
    arrNames = persArr.map(function(item) {
        
        return item.name;
    });
    
    
    // Sorterar namnen.
    // Hittade metod för att sortera å,ä,ö på "https://www.flashback.org/t2262936".
    
    arrNames.sort(function(a, b) {
        
        return a.localeCompare(b);
    });
    
    
    // Ser till att namnen hamnar på samma rad skiljt av ett kommatecken.
    // Tilldelar dessa till resultatobjektet.
    
    resultObject.names = arrNames.join(', ');
    
    
    // Returnerar resultatobjektet. 
    
    return resultObject;
};

var data = [{name: "John Häggerud", age: 37}, {name: "Johan Leitet", age: 36}, {name: "Mats Loock", age: 46}];

var result = makePerson(data);

console.log(result);
