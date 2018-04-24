'use strict';

var currentLanguage;
var dictionary = {}, $scope={};

function getStorageLanguage() {
    if (typeof (Storage) !== 'undefined') {
        currentLanguage = localStorage.getItem('language');
        if (!currentLanguage)
            setStorageLanguage();
        else
            setHTMLLang()
    } else {
        alert('Your browser does not support web storage');
    }
}

function setHTMLLang() {
    document.getElementsByTagName('html')[0].setAttribute('lang', currentLanguage);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            dictionary = JSON.parse(xhttp.response);
            var elements = document.querySelectorAll('[dc-bind]');
            elements.forEach(function (element) {
                console.log("element", element)
                element.innerHTML = dictionary[element.getAttribute("dc-bind")];
            });
        }
    };
    xhttp.open('GET', currentLanguage+'.json', true);
    xhttp.send()
}

function setStorageLanguage(lang) {

    if (typeof (Storage) !== 'undefined') {
        localStorage.setItem('language', lang || 'en');
        getStorageLanguage();
    } else {
        alert('Your browser does not support web storage');
    }
}

getStorageLanguage();