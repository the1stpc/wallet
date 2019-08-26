let nameMonth = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
let weekDay = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];

var appData = {
  dates: {},
  moneyStorage: [],
  income: [],
  expenses: [],
  arrears: [],
  transaction: [],
  users: []
};

function getFloat(numberFloat) {
  let x = parseFloat(numberFloat);
  x = x.toFixed(2);
  return parseFloat(x);
}

function localSt() {
  let serialObj = JSON.stringify(appData);
  localStorage.setItem("myKey", serialObj);
  return serialObj;
}

function start() {

  function getAppData() {
    if (localStorage.getItem("myKey") !== null)
      appData = JSON.parse(localStorage.getItem("myKey"))
    return appData;
  }

  function setDate() {
    let currentDate = new Date();
    let date = currentDate.getDate();
    let currentDateWr = weekDay[currentDate.getDay()] + " " + date + " " + nameMonth[currentDate.getMonth()] + " " + currentDate.getFullYear() + " г.";
    let $dateInner = document.querySelector(".js-currentDate");
    $dateInner.innerHTML = currentDateWr;
  }
  getAppData();
  setDate();
}

start();