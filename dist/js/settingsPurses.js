"use strict";

var $btnCreatPurse = document.querySelector('.js-btnCreatePurse');
var $chooseClassPurse = document.querySelector('.js-chooseClassPurse');
var $purseName = document.querySelector('.js-purseName');
var $purseBalance = document.querySelector('.js-purseBalance');
var delItemsPurses = [];
var delItemsCards = [];
var delItemsContributions = [];
var delItemsMoneyBoxes = [];

function initPurses() {
  initForm();
  renderPurse();
}

function renderPurse() {
  delItemsPurses = [];
  delItemsCards = [];
  delItemsContributions = [];
  delItemsMoneyBoxes = [];
  renderPurses();
  delBtnsPurses();
}

function initForm() {
  $btnCreatPurse.addEventListener('click', function btnCreatPurse() {
    if ($purseName.value && $purseBalance.value !== '') {
      appData.moneyStorage[$chooseClassPurse.value][$purseName.value] = getFloat($purseBalance.value);
      localSt();
      renderPurse();
    } else {
      $purseBalance.style.border = 'border: 2px red';
    }
  });
}

function renderPurses() {
  $purseName.value = "";
  $purseBalance.value = "";
  var $tablePurses = document.querySelector('.tablePurses');
  var $tableCards = document.querySelector('.tableCards');
  var $tableContributions = document.querySelector('.tableContributions');
  var $tableMoneyBoxes = document.querySelector('.tableMoneyBoxes');
  var tablePursesInner = '';
  var tableCardsInner = '';
  var tableContributionsInner = '';
  var tablemoneyBoxesInner = '';

  function tableRender(x, z, c, zz) {
    var i = 1;

    for (var _i = 0, _Object$keys = Object.keys(x); _i < _Object$keys.length; _i++) {
      var item = _Object$keys[_i];

      if (item !== null) {
        z += "<tr> <th>" + i + "</th> <td>" + item + "</td><td>" + x[item] + "</td><td><button class=\"btn btn-primary delete" + zz + "\">" + "Удалить" + "</button></td>";

        switch (x) {
          case appData.moneyStorage.purse:
            delItemsPurses.push(item);
            break;

          case appData.moneyStorage.card:
            delItemsCards.push(item);
            break;

          case appData.moneyStorage.contribution:
            delItemsContributions.push(item);
            break;

          case appData.moneyStorage.moneybox:
            delItemsMoneyBoxes.push(item);
            break;
        }
      }

      i++;
    }

    z += "</tr>";
    c.innerHTML = z;
  }

  tableRender(appData.moneyStorage.purse, tablePursesInner, $tablePurses, "Purses");
  tableRender(appData.moneyStorage.card, tableCardsInner, $tableCards, "Cards");
  tableRender(appData.moneyStorage.contribution, tableContributionsInner, $tableContributions, "Contributions");
  tableRender(appData.moneyStorage.moneybox, tablemoneyBoxesInner, $tableMoneyBoxes, "Moneyboxs");
}

function delBtnsPurses() {
  var $btnDeletePurses = document.querySelectorAll('.deletePurses');
  var $btnDeleteCards = document.querySelectorAll('.deleteCards');
  var $btnDeleteContributions = document.querySelectorAll('.deleteContributions');
  var $btnDeleteMoneyboxs = document.querySelectorAll('.deleteMoneyboxs');

  function btnsAllMoneyStorage(x, y, c) {
    var _loop = function _loop(i) {
      y[i].addEventListener('click', function btnDelete() {
        delete x[c[i]];
        localSt();
        renderPurse();
      });
    };

    for (var i = 0; i < Object.keys(x).length; i++) {
      _loop(i);
    }
  }

  btnsAllMoneyStorage(appData.moneyStorage.purse, $btnDeletePurses, delItemsPurses);
  btnsAllMoneyStorage(appData.moneyStorage.card, $btnDeleteCards, delItemsCards);
  btnsAllMoneyStorage(appData.moneyStorage.contribution, $btnDeleteContributions, delItemsContributions);
  btnsAllMoneyStorage(appData.moneyStorage.moneybox, $btnDeleteMoneyboxs, delItemsMoneyBoxes);
}

initPurses();