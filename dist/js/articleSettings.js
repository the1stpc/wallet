"use strict";

var $incomeArticles = document.querySelector('.incomeArticles');
var $expensesArticles = document.querySelector('.expensesArticles');
var $btnArticles = document.querySelector('.js-articlesSettings');
var $articles = document.querySelector('.articles');
var tableIncomeInner = '';
var tableExpensesInner = '';

function init() {
  addArticle();
  render();
}

function render() {
  renderArticles("income", tableIncomeInner, $incomeArticles);
  renderArticles("expenses", tableExpensesInner, $expensesArticles);
  delBtns();
  settingsShow();
}

function addArticle() {
  var $addArticle = document.querySelector('.js-btnCreateArticle');
  var $articleName = document.querySelector('.js-articleName');
  var $chooseNewArticle = document.querySelector('.js-chooseNewArticle');
  $addArticle.addEventListener('click', function () {
    appData[$chooseNewArticle.value].push($articleName.value);
    localSt();
    $articleName.value = '';
    render();
    renderChooseArticle();
  });
}

function renderArticles(x, z, c) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = appData[x][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;

      if (item !== null) {
        // let divTableRow1 = "<div class=\"tableRow\">" + item + "</div>";
        var divTableRow1 = "\n      <div class=\"tableRow\">\n      ".concat(item, "\n      </div>");
        var divTableDelete = "<div class=\"tableRow\">" + "<button class=\"delete" + x + "\">" + "Удалить" + "</button>" + "</div>";
        z += "<div>" + divTableRow1 + divTableDelete + "</div>";
      }
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

  c.innerHTML = z;
}

function delBtns() {
  var $btnDeleteExpenses = document.querySelectorAll('.deleteexpenses');
  var $btnDeleteIncome = document.querySelectorAll('.deleteincome');

  function btnsAllArticles(x, y) {
    var _loop = function _loop(i) {
      y[i].addEventListener('click', function btnDelete() {
        x.splice(i, 1);
        localSt();
        render();
        renderChooseArticle();
      });
    };

    for (var i = 0; i < x.length; i++) {
      _loop(i);
    }
  }

  if (appData.income.length !== 0) {
    btnsAllArticles(appData.income, $btnDeleteIncome);
  }

  if (appData.expenses.length !== 0) {
    btnsAllArticles(appData.expenses, $btnDeleteExpenses);
  }
}

function settingsShow() {
  $btnArticles.addEventListener('click', function articlesSettings() {
    if ($articles.style.display == 'block') {
      $articles.style.display = 'none';
    } else {
      $articles.style.display = 'block';
    }
  });
}

init();