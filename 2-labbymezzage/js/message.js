"use strict";

function Message(message, date) {
    
    this.getText = function() {
        return message;
    };
    
    this.setText = function(_text) {
        message = _text;
    };
    
    this.getDate = function() {
        return date;
    };
    
    this.setDate = function(_date) {
        date = _date;
    };
}
 
Message.prototype.toString = function() {
    
    return this.getText()+"  ("+this.getDate()+")";
};
 
Message.prototype.getHTMLText = function() {
    
    return this.getText().replace(/[\n\r]/g, "<br />");
};

Message.prototype.getDateText = function() {
    
    var timeStamp = this.getDate();
    
    return timeStamp.getHours() + ":" + timeStamp.getMinutes() + ":" + timeStamp.getSeconds();
};

Message.prototype.getFullDate = function(){
    
    var day = this.getDate().getDate();
    var monthNames = ["januari", "februari", "mars", "april", "maj", "juni", "juli", "augusti", "september", "oktober", "november", "december"];
    var month = this.getDate().getMonth();
    var year = this.getDate().getFullYear();
    var hour = this.getDate().getHours();
    var minute = this.getDate().getMinutes();
    var second = this.getDate().getSeconds();
    
    return ["Inlägget skapades den " + day + " " + monthNames[month] + " " + year +" klockan " + hour + ":" +  minute + ":" + second];
};
