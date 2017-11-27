var frstul = document.getElementById("firstul");
var txt = document.getElementById("txt");
var btn = document.getElementById("btn");
var slcted = document.getElementById("sort-news");
var array = [];
var secArr = [];

slcted.onchange = function () {
    if (slcted.value == "none") {
        frstul.innerHTML = null;
    } else if (slcted.value == "score") {
        frstul.innerHTML = null;
        sortByScore();

        appnd();
    } else if (slcted.value == "comments") {
        frstul.innerHTML = null; 
        sortByComments();

        appnd();

    } else if (slcted.value == "newest") {
        frstul.innerHTML = null; 
        sortByDate();

        appnd();

    }
}

window.onload = function () {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            var json = JSON.parse(xhttp.responseText);
            arrfun(json);
            SingleIDfun();


        }
    };

    xhttp.open("GET", "https://hacker-news.firebaseio.com/v0/topstories.json", true);
    xhttp.send();



    function arrfun(json) {
        for (i = 0; i < 30; i++) {
            array.push(json[i]);
        }
    }


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function takeID(SingleID) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {

            if (this.readyState == 4 && this.status == 200) {
                var json = JSON.parse(xhttp.responseText);
                secArr.push(json);

                if (slcted.value == "score") {
                    sortByScore();

                } else if (slcted.value == "comments") {
                    sortByComments();

                } else if (slcted.value == "newest") {
                    sortByDate();
                }
            }
        };

        xhttp.open("GET", "https:/hacker-news.firebaseio.com/v0/item/" + SingleID + ".json", true);
        xhttp.send();
    }

    function SingleIDfun() {
        for (i = 0; i < array.length; i++) {
            takeID(array[i]);
        }


    }


}

 /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function sortByComments() {

    secArr.sort(function (a, b) {
        if (a.descendants < b.descendants) {
            return 1;
        } else if (a.descendants > b.descendants) {
            return -1;
        }
        return 0;
    });
}


function sortByScore() {

    secArr.sort(function (a, b) {
        if (a.score < b.score) {
            return 1;
        } else if (a.score > b.score) {
            return -1;
        }
        return 0;
    });
}
function sortByDate() {

    secArr.sort(function (a, b) {
        if (a.time < b.time) {
            return 1;
        } else if (a.time > b.time) {
            return -1;
        }
        return 0;
    });
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function appnd() {
    for (i = 0; i < 30; i++) {
        var frstli = document.createElement("li");
        var secul = document.createElement("ul");
        var secli = document.createElement("li");
        var link = document.createElement("a");

        secul.appendChild(secli);
        frstli.appendChild(link);
        frstli.appendChild(secul);
        frstul.appendChild(frstli);


        link.innerHTML = secArr[i].title;
        link.href = secArr[i].url;

        var time = new Date(secArr[i].time*1000);

        secli.innerHTML = "Score: ( " + secArr[i].score + " ) Time:  ( " + time + " ) Comments: (  " + secArr[i].descendants+" )";
        frstli.className = "bb";
        secli.className = "b";
    }
}