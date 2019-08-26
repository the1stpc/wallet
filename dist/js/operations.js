"use strict";

var $chooseArticle = document.querySelector('.js-chooseArticle');
var $chooseArticlesName = document.querySelector('.js-chooseArticlesName');
var $chooseAccounts = document.querySelector('.js-chooseAccounts');
var purses, cards, contributions, moneyboxes;
var chooseAccountsInner = '';
var $BtnCreateOperation = document.querySelector('.js-btnCreateOperation');
var $operationValue = document.querySelector('.js-operationValue');
var $accountValues = document.getElementsByName('moneyStorages');
var $accountValue;

function initOperations() {
  filterMoneyStorage();
  filterTransaction();
  createOperation();
  renderChooseArticle();
  renderAllaccount();
  renderTransaction();
}

var incomeFilter, epxenseFilter;

function filterTransaction() {
  incomeFilter = appData.transaction.filter(function (a) {
    return a.type == 'income';
  });
  epxenseFilter = appData.transaction.filter(function (a) {
    return a.type == 'expense';
  });
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

function renderAllaccount() {
  renderChoosePurse(purses);
  renderChoosePurse(cards);
  renderChoosePurse(contributions);
  renderChoosePurse(moneyboxes);
  $chooseAccounts.innerHTML = "<div class=\"cc-selector\">\n  ".concat(chooseAccountsInner, "\n  </div>");
}

function renderChoosePurse(array) {
  array.forEach(function (element, i) {
    chooseAccountsInner += " <input id=\"".concat(element.type).concat(i, "\" name=\"moneyStorages\" value=\"").concat(element.name, "\" data-value2=\"").concat(element.value, "\" type=\"radio\">\n    <label class=\"drinkcard-cc ").concat(element.type, "Radio\" for=\"").concat(element.type).concat(i, "\" value=\"").concat(element.name, "\" data-value2=\"").concat(element.value, "\"><span class=\"textBottom\">").concat(element.name, " ").concat(element.value, "</span></label>");
  });
}

function createOperation() {
  $BtnCreateOperation.addEventListener('click', function () {
    $accountValues.forEach(function (element, i) {
      if ($accountValues[i].checked == true) {
        $accountValue = $accountValues[i];
      }
    });

    if ($chooseArticle.value == 'newIncome') {
      appData.transaction.push({
        type: 'income',
        date: new Date(),
        account: $accountValue.value,
        article: $chooseArticlesName.value,
        value: $operationValue.value
      });
      appData.moneyStorage.forEach(function (element, i) {
        if (element.name == $accountValue.value) {
          appData.moneyStorage[i].value = getFloat($accountValue.dataset.value2) + getFloat($operationValue.value);
        }
      });
    } else {
      appData.transaction.push({
        type: 'expense',
        date: new Date(),
        account: $accountValue.value,
        article: $chooseArticlesName.value,
        value: $operationValue.value
      });
      appData.moneyStorage.forEach(function (element, i) {
        if (element.name == $accountValue.value) {
          appData.moneyStorage[i].value = getFloat($accountValue.dataset.value2) - getFloat($operationValue.value);
        }
      });
    }

    localSt();
    chooseAccountsInner = '';
    $operationValue.value = '';
    renderChooseArticle();
    renderAllaccount();
  });
}

;

function renderTransaction() {
  var $tableOperationsIncome = document.querySelector('.tableOperationsIncome');
  var $tableOperationsExpenses = document.querySelector('.tableOperationsExpenses');
  var tableOperationsExpensesInner, tableOperationsIncomeInner;

  function tableRenderTransaction(array, innerBox, innerPlace) {
    array.forEach(function (element, i) {
      if (element !== null) {
        innerBox += "\n        <tr>\n        <th>".concat(i + 1, "</th>\n        <td>").concat(element.date, "</td>\n        <td>").concat(element.account, "</td>\n        <td>").concat(element.article, "</td>\n        <td>").concat(element.value, "</td>\n        <td><button class=\"btn btn-primary delete").concat(element.type, "\"> \u0423\u0434\u0430\u043B\u0438\u0442\u044C </button></td>\n        ");
      }
    });
    innerBox += "</tr>";
    innerPlace.innerHTML = innerBox;
  }

  if (incomeFilter.length !== 0) {
    tableRenderTransaction(incomeFilter, tableOperationsIncomeInner, $tableOperationsIncome);
  } else {
    $tableOperationsIncome.innerHTML = "\u041F\u043E\u043A\u0430 \u0443 \u0412\u0430\u0441 \u043D\u0435\u0442 \u0434\u043E\u0445\u043E\u0434\u043E\u0432";
  }

  if (epxenseFilter.length !== 0) {
    tableRenderTransaction(epxenseFilter, tableOperationsExpensesInner, $tableOperationsExpenses);
  } else {
    $tableOperationsExpenses.innerHTML = "\u041F\u043E\u043A\u0430 \u0443 \u0412\u0430\u0441 \u043D\u0435\u0442 \u0440\u0430\u0441\u0445\u043E\u0434\u043E\u0432";
  }
}

initOperations();