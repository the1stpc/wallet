"use strict";

var nameMonth = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
var weekDay = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
var appData = {
  dates: {},
  moneyStorage: [],
  income: [],
  expenses: [],
  arrears: []
};

function getFloat(numberFloat) {
  return parseFloat(numberFloat).toFixed(2);
}

function localSt() {
  var serialObj = JSON.stringify(appData);
  localStorage.setItem("myKey", serialObj);
  return serialObj;
}

function start() {
  function getAppData() {
    if (localStorage.getItem("myKey") !== null) appData = JSON.parse(localStorage.getItem("myKey"));
    return appData;
  }

  function setDate() {
    var currentDate = new Date();
    var date = currentDate.getDate();
    var currentDateWr = weekDay[currentDate.getDay()] + " " + date + " " + nameMonth[currentDate.getMonth()] + " " + currentDate.getFullYear() + " г.";
    var $dateInner = document.querySelector(".js-currentDate");
    $dateInner.innerHTML = currentDateWr;
  }

  getAppData();
  setDate();
}

start();