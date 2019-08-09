let $incomeArticles = document.querySelector('.incomeArticles');
let $expensesArticles = document.querySelector('.expensesArticles');
let $btnArticles=document.querySelector('.js-articlesSettings');
let $articles=document.querySelector('.articles');
let tableIncomeInner = '';
let tableExpensesInner = '';

function initArticle() {
  addArticle();
  renderArticle();
}

function renderArticle() {
  renderArticles("income", tableIncomeInner, $incomeArticles);
  renderArticles("expenses", tableExpensesInner, $expensesArticles);
  delBtnsArticle();
  settingsShow();
}

function addArticle() {
  let $addArticle = document.querySelector('.js-btnCreateArticle');
  let $articleName = document.querySelector('.js-articleName');
  let $chooseNewArticle = document.querySelector('.js-chooseNewArticle');
  $addArticle.addEventListener('click', function () {
    appData[$chooseNewArticle.value].push($articleName.value);
    localSt();
    $articleName.value = '';
    renderArticle();
  });
}

function renderArticles(x, z, c) {
  for (let item of appData[x]) {
    if (item !== null) {
      // let divTableRow1 = "<div class=\"tableRow\">" + item + "</div>";
      let divTableRow1 = `
      <div class="tableRow">
      ${item}
      </div>`;
      let divTableDelete = "<div class=\"tableRow\">" + "<button class=\"delete" + x + "\">" + "Удалить" + "</button>" + "</div>";
      z += "<div>" + divTableRow1 + divTableDelete + "</div>";
    }
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
        renderArticle();
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

function settingsShow(){  
  $btnArticles.addEventListener('click', function articlesSettings(){    
    if ($articles.style.display == 'block'){
      $articles.style.display = 'none';
    }else{
      $articles.style.display = 'block';
    }
  });
}

initArticle();
