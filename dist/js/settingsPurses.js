"use strict";

var $btnCreatPurse = document.querySelector('.js-btnCreatePurse');
var $chooseClassPurse = document.querySelector('.js-chooseClassPurse');
var $purseName = document.querySelector('.js-purseName');
var $purseBalance = document.querySelector('.js-purseBalance');
var $purses = document.querySelector('.purses');
var $btnPurses = document.querySelector('.js-purseSettings');
var purses, cards, contributions, moneyboxes;

function filterMoneyStorage() {
  purses = appData.moneyStorage.filter(function (a) {
    return a.type == 'purse';
  });
  cards = appData.moneyStorage.filter(function (a) {
    return a.type == 'card';
  });
  contributions = appData.moneyStorage.filter(function (a) {
    return a.type == 'contribution';
  });
  moneyboxes = appData.moneyStorage.filter(function (a) {
    return a.type == 'moneybox';
  });
}

function initPurses() {
  initForm();
  renderPurse();
}

function renderPurse() {
  filterMoneyStorage();
  renderPurses();
  delBtnsPurses();
  settingsShowPurses();
}

function initForm() {
  $btnCreatPurse.addEventListener('click', function btnCreatPurse() {
    if ($purseName.value && $purseBalance.value !== '') {
      appData.moneyStorage.push({
        type: $chooseClassPurse.value,
        name: $purseName.value,
        value: getFloat($purseBalance.value)
      });
      localSt();
      renderPurse();
      $purseName.value = "";
      $purseBalance.value = "";
    } else {
      $purseBalance.style.border = 'border: 2px red';
    }
  });
}

function renderPurses() {
  var $tablePurses = document.querySelector('.tablePurses');
  var $tableCards = document.querySelector('.tableCards');
  var $tableContributions = document.querySelector('.tableContributions');
  var $tableMoneyBoxes = document.querySelector('.tableMoneyBoxes');
  var tablePursesInner = '';
  var tableCardsInner = '';
  var tableContributionsInner = '';
  var tablemoneyBoxesInner = '';

  function tableRender(x, z, c, zz) {
    x.forEach(function (item, i) {
      if (item !== null) {
        z += "<tr>\n          <th>".concat(i + 1, "</th>\n          <td>").concat(item.name, "</td>\n          <td>").concat(item.value, "</td>\n          <td><button class=\"btn btn-primary delete").concat(zz, "\"> \u0423\u0434\u0430\u043B\u0438\u0442\u044C </button></td>");
      }
    });
    z += "</tr>";
    c.innerHTML = z;
  }

  tableRender(purses, tablePursesInner, $tablePurses, "Purses");
  tableRender(cards, tableCardsInner, $tableCards, "Cards");
  tableRender(contributions, tableContributionsInner, $tableContributions, "Contributions");
  tableRender(moneyboxes, tablemoneyBoxesInner, $tableMoneyBoxes, "Moneyboxs");
}

function delBtnsPurses() {
  var $btnDeletePurses = document.querySelectorAll('.deletePurses');
  var $btnDeleteCards = document.querySelectorAll('.deleteCards');
  var $btnDeleteContributions = document.querySelectorAll('.deleteContributions');
  var $btnDeleteMoneyboxs = document.querySelectorAll('.deleteMoneyboxs');

  function btnsAllMoneyStorage(x, y, c) {
    x.forEach(function (item, i) {
      y[i].addEventListener('click', function btnDelete() {
        delete item.type;
        delete item.name;
        delete item.value;
        localSt();
        renderPurse();
      });
    });
  }

  btnsAllMoneyStorage(purses, $btnDeletePurses);
  btnsAllMoneyStorage(cards, $btnDeleteCards);
  btnsAllMoneyStorage(contributions, $btnDeleteContributions);
  btnsAllMoneyStorage(moneyboxes, $btnDeleteMoneyboxs);
}

function settingsShowPurses() {
  $btnPurses.addEventListener('click', function pursesSettings() {
    if ($purses.style.display == 'block') {
      $purses.style.display = 'none';
    } else {
      $purses.style.display = 'block';
    }
  });
}

initPurses();