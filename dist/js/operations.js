"use strict";

var $chooseArticle = document.querySelector('.js-chooseArticle');
var $chooseArticlesName = document.querySelector('.js-chooseArticlesName');
var $choosePurses = document.querySelector('.js-choosePurses');
var $chooseCards = document.querySelector('.js-chooseCards');
var $chooseContributions = document.querySelector('.js-chooseContributions');
var $chooseMoneyBoxes = document.querySelector('.js-chooseMoneyBoxes');
var purses, cards, contributions, moneyboxes;
var tablePursesInner = '';
var tableCardsInner = '';
var tableContributionsInner = '';
var tableMoneyBoxesInner = '';

function initOperations() {
  filterMoneyStorage();
  renderChooseArticle();
  renderChoosePurse(purses, tablePursesInner, $choosePurses);
  renderChoosePurse(cards, tableCardsInner, $chooseCards);
  renderChoosePurse(contributions, tableContributionsInner, $chooseContributions);
  renderChoosePurse(moneyboxes, tableMoneyBoxesInner, $chooseMoneyBoxes);
}

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

function renderChooseArticle() {
  var z = '';
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = appData.income[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;
      var $option = "<option value=" + item + ">" + item + "</option>";
      z += $option;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  $chooseArticlesName.innerHTML = z;
  $chooseArticle.addEventListener('change', function Change() {
    if ($chooseArticle.value == 'newIncome') {
      z = '';
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = appData.income[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var item = _step2.value;
          var $option = "<option value=" + item + ">" + item + "</option>";
          z += $option;
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      $chooseArticlesName.innerHTML = z;
    } else {
      z = '';
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = appData.expenses[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var _item = _step3.value;

          var _$option = "<option value=" + _item + ">" + _item + "</option>";

          z += _$option;
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
            _iterator3["return"]();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      $chooseArticlesName.innerHTML = z;
    }
  });
}

function renderChoosePurse(array, content, place) {
  var i = 1;
  content = '';
  array.forEach(function (element) {
    content += "<div class=\"col\">\n      <input class=\"".concat(element.type, " form-check-input myInputRadio\" name=\"moneyStorages\" value=\"").concat(element.type, "\" type=\"radio\">\n      <label class=\"form-check-label myLabel\" for=\"moneyStorages").concat(i + 1, "\">").concat(element.name, " ").concat(element.value, "</label>\n      </div>\n      \n    ");
    i++;
  });
  place.innerHTML = content;
}

initOperations();