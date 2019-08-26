let $incomeArticles = document.querySelector('.incomeArticles');
let $expensesArticles = document.querySelector('.expensesArticles');
let $btnArticles = document.querySelector('.js-articlesSettings');
let $articles = document.querySelector('.articles');
let tableIncomeInner = '';
let tableExpensesInner = '';

function initArticle() {
  addArticle();
  renderChooseArticle();
}

function renderChooseArticle() {
  renderArticlesTables("income", tableIncomeInner, $incomeArticles);
  renderArticlesTables("expenses", tableExpensesInner, $expensesArticles);
  delBtnsArticle();
  settingsShow();
}

function addArticle() {
  let $addArticle = document.querySelector('.js-btnCreateArticle');
  let $articleName = document.querySelector('.js-articleName');
  let $chooseNewArticle = document.querySelector('.js-chooseNewArticle');
  
    $addArticle.addEventListener('click', function () {
      if ($articleName.value !== '') {
      appData[$chooseNewArticle.value].push($articleName.value);
      localSt();
      $articleName.value = '';
      renderChooseArticle();
      }else {
        alert('Заполните поля!')
      }
    });

}

function renderArticlesTables(x, z, c) {
  let i = 1;
  for (let item of appData[x]) {
    if (item !== null) {
      z += "<tr> <th>" + i + "</th> <td>" + item + "</td><td><button class=\"btn btn-primary delete" + x + "\">" + "Удалить" + "</button></td>";
    }
    i++;
  }
  c.innerHTML = z;
}

function delBtnsArticle() {
  var $btnDeleteExpenses = document.querySelectorAll('.deleteexpenses');
  var $btnDeleteIncome = document.querySelectorAll('.deleteincome');
  function btnsAllArticles(x, y) {
    for (let i = 0; i < x.length; i++) {
      y[i].addEventListener('click', function btnDelete() {
        x.splice(i, 1);
        localSt();
        renderChooseArticle();
      });
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

initArticle();
