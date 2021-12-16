
var api = 'http://ip-api.com/json/?fields=status,city,regionName,country,zip,query,message';
isReady = "No";
var xReq = new XMLHttpRequest();

xReq.onreadystatechange = function () {
	if (this.readyState == 4 && this.status == 200) {
		var resValues = JSON.parse(this.responseText);
		let cb = new ChatBot();
        cb.getGeoInfo(resValues);
      
	}	
};
xReq.open('GET', api, true);
xReq.send();




function showCoords(event) {
    var x = event.clientX;
    var y = event.clientY;
    var coords = "Page X: " + x + ",Page Y: " + y;

    var divChat = document.getElementById("divChatbot");
    x = divChat.offsetLeft;
    y = divChat.offsetTop;
    coords += " ; Div X: " + x + ",Div Y: " + y;
    document.getElementById("demo").innerHTML = coords;
}



function fxnDrag() {
    isReady = "Yes";
}

function fxnDrop() {
    isReady = "No";
}



function fxnMove(event) {
    if (isReady == "Yes") {
        var x = event.clientX;
        var y = event.clientY;

        var divChat = document.getElementById("divChatbot");
        var divX = divChat.offsetLeft;
        var divY = divChat.offsetTop;

        var xIntrvl = x - divX;
        var yIntrvl = y - divY;

        //  x = x + xIntrvl;
        // y = y + yIntrvl;

        console.log("x:" + x + " y:" + y + " dx:" + divX + "dy:" + divY)

        divChat.style.left = x + "px";
        divChat.style.top = y + "px";
    }
}

function fxnInfo() {
    let bi = new BInfo();
    bi.fxnInfo();
}

function fxnThemeBtn() {
    var vDivChatbot = document.getElementById("divChatbot");
    var vDivBtn = document.getElementById("divThemeBtn");
    var vAlign = vDivBtn.style.textAlign;

    if (vAlign == "right") {
        vDivBtn.style.textAlign = "left";
        vDivBtn.style.backgroundColor = "lightgray";
        vDivChatbot.className = "Chatbot ChatbotLight";

    }
    else {
        vDivBtn.style.textAlign = "right";
        vDivBtn.style.backgroundColor = "black";
        vDivChatbot.className = "Chatbot ChatbotDark";

    }
}
class ChatBot {
    constructor() { }

    getGeoInfo(resValues) {
        if (resValues.status == 'success') {
            document.getElementById("txtStreet").value = "";
            document.getElementById("txtCity").value = resValues.city;
            document.getElementById("txtState").value = resValues.regionName;
            document.getElementById("txtCountry").value = resValues.country;
            document.getElementById("txtZip").value = resValues.zip;
            document.getElementById("txtIP").value = resValues.query;
        }
        else {
            console.log('Error: ' + resValues.message);
            return
        }


    }
}

class BInfo {

    fxnInfo() {

        var _UserAgent = navigator.userAgent;
        var bName = "", bVersion = "", osName = "";

        // browser info
        if (_UserAgent.includes('Firefox/')) {
            bName = "Firefox";
        }
        else if (_UserAgent.includes('Edg/')) {
            bName = "Edge";
        }
        else if (_UserAgent.includes('Chrome/')) {
            bName = "Chrome";
            bVersion = _UserAgent.split('Chrome/')[1].split(' ')[0];
        }
        else if (_UserAgent.includes('Safari/')) {
            bName = "Safari";
        }


        //  operating system name
        if (_UserAgent.indexOf("Windows NT 10.0") != -1) {
            osName = "Windows 10";
        }
        if (_UserAgent.indexOf("Windows NT 6.3") != -1) {
            osName = "Windows 8.1";
        }
        if (_UserAgent.indexOf("Windows NT 6.2") != -1) {
            osName = "Windows 8";
        }
        if (_UserAgent.indexOf("Windows NT 6.1") != -1) {
            osName = "Windows 7";
        }
        if (_UserAgent.indexOf("Windows NT 6.0") != -1) {
            osName = "Windows Vista";
        }
        if (_UserAgent.indexOf("Windows NT 5.1") != -1) {
            osName = "Windows XP";
        }
        if (_UserAgent.indexOf("Windows NT 5.0") != -1) {
            osName = "Windows 2000";
        }
        if (_UserAgent.indexOf("Mac") != -1) {
            osName = "Mac/iOS";
        }
        if (_UserAgent.indexOf("X11") != -1) {
            osName = "UNIX";
        }
        if (_UserAgent.indexOf("Linux") != -1) {
            osName = "Linux";
        }

        alert("Browser: " + bName + "; Version: " + bVersion + "; Operating System: " + osName);



    }
}

