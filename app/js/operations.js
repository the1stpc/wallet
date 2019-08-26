let $chooseArticle = document.querySelector('.js-chooseArticle');
let $chooseArticlesName = document.querySelector('.js-chooseArticlesName');
let $chooseAccounts = document.querySelector('.js-chooseAccounts');
let purses, cards, contributions, moneyboxes;
let chooseAccountsInner = '';
let $BtnCreateOperation = document.querySelector('.js-btnCreateOperation');
let $operationValue = document.querySelector('.js-operationValue');
let $accountValues = document.getElementsByName('moneyStorages');
let $accountValue;

function initOperations() {
  filterMoneyStorage();
  filterTransaction();
  createOperation();
  renderChooseArticle();
  renderAllaccount();
  renderTransaction();
}

let incomeFilter, epxenseFilter;
function filterTransaction() {
  incomeFilter = appData.transaction.filter(function (a) {
    return a.type == `${'income'}`;
  });
  epxenseFilter = appData.transaction.filter(function (a) {
    return a.type == `${'expense'}`;
  });
}


function filterMoneyStorage() {
  purses = appData.moneyStorage.filter(function (a) {
    return a.type == `${'purse'}`;
  });
  cards = appData.moneyStorage.filter(function (a) {
    return a.type == `${'card'}`;
  });
  contributions = appData.moneyStorage.filter(function (a) {
    return a.type == `${'contribution'}`;
  });
  moneyboxes = appData.moneyStorage.filter(function (a) {
    return a.type == `${'moneybox'}`;
  });
}

function renderChooseArticle() {
  let z = '';
  for (let item of appData.income) {
    let $option = "<option value=" + item + ">" + item + "</option>";
    z += $option;
  }
  $chooseArticlesName.innerHTML = z;
  $chooseArticle.addEventListener('change', function Change() {
    if ($chooseArticle.value == 'newIncome') {
      z = '';
      for (let item of appData.income) {
        let $option = "<option value=" + item + ">" + item + "</option>";
        z += $option;
      }
      $chooseArticlesName.innerHTML = z;
    } else {
      z = '';
      for (let item of appData.expenses) {
        let $option = "<option value=" + item + ">" + item + "</option>";
        z += $option;
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
  $chooseAccounts.innerHTML = `<div class="cc-selector">
  ${chooseAccountsInner}
  </div>`;
}


function renderChoosePurse(array) {
  array.forEach((element, i) => {
    chooseAccountsInner += ` <input id="${element.type}${i}" name="moneyStorages" value="${element.name}" data-value2="${element.value}" type="radio">
    <label class="drinkcard-cc ${element.type}Radio" for="${element.type}${i}" value="${element.name}" data-value2="${element.value}"><span class="textBottom">${element.name} ${element.value}</span></label>`;
  });
}

function createOperation() {
  $BtnCreateOperation.addEventListener('click', function () {
    $accountValues.forEach((element, i) => {
      if ($accountValues[i].checked == true) {
        $accountValue = $accountValues[i];
      }
    });
    if ($chooseArticle.value == 'newIncome') {
      appData.transaction.push({ type: 'income', date: new Date(), account: $accountValue.value, article: $chooseArticlesName.value, value: $operationValue.value });
      appData.moneyStorage.forEach((element, i) => {
        if (element.name == $accountValue.value) {
          appData.moneyStorage[i].value = getFloat($accountValue.dataset.value2) + getFloat($operationValue.value);
        }
      });
    } else {
      appData.transaction.push({ type: 'expense', date: new Date(), account: $accountValue.value, article: $chooseArticlesName.value, value: $operationValue.value });
      appData.moneyStorage.forEach((element, i) => {
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
};

function renderTransaction() {

  let $tableOperationsIncome = document.querySelector('.tableOperationsIncome');
  let $tableOperationsExpenses = document.querySelector('.tableOperationsExpenses');
  let tableOperationsExpensesInner, tableOperationsIncomeInner;
  function tableRenderTransaction(array, innerBox, innerPlace) {
    array.forEach((element, i) => {
      if (element !== null) {
        innerBox += `
        <tr>
        <th>${i + 1}</th>
        <td>${element.date}</td>
        <td>${element.account}</td>
        <td>${element.article}</td>
        <td>${element.value}</td>
        <td><button class="btn btn-primary delete${element.type}"> Удалить </button></td>
        `
      }
    });
    innerBox += `</tr>`;
    innerPlace.innerHTML = innerBox;
  }
  if (incomeFilter.length !== 0) {
    tableRenderTransaction(incomeFilter, tableOperationsIncomeInner, $tableOperationsIncome);
  }else {
    $tableOperationsIncome.innerHTML = `Пока у Вас нет доходов`
  }
  if (epxenseFilter.length !== 0){
    tableRenderTransaction(epxenseFilter, tableOperationsExpensesInner, $tableOperationsExpenses);
  }else{
    $tableOperationsExpenses.innerHTML = `Пока у Вас нет расходов`
  }
}


initOperations();