let $chooseArticle = document.querySelector('.js-chooseArticle');
let $chooseArticlesName = document.querySelector('.js-chooseArticlesName');
let $choosePurses = document.querySelector('.js-choosePurses');
let $chooseCards = document.querySelector('.js-chooseCards');
let $chooseContributions = document.querySelector('.js-chooseContributions');
let $chooseMoneyBoxes = document.querySelector('.js-chooseMoneyBoxes');
let purses, cards, contributions, moneyboxes;
let tablePursesInner = '';
let tableCardsInner = '';
let tableContributionsInner = '';
let tableMoneyBoxesInner = '';

function initOperations() {
  filterMoneyStorage();
  renderChooseArticle();
  renderChoosePurse(purses,tablePursesInner,$choosePurses);
  renderChoosePurse(cards,tableCardsInner,$chooseCards);
  renderChoosePurse(contributions,tableContributionsInner, $chooseContributions);
  renderChoosePurse(moneyboxes,tableMoneyBoxesInner, $chooseMoneyBoxes);
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

function renderChoosePurse(array, content, place) {
  let i = 1;
  content = '';
  array.forEach(element => {
    content += `<div class="col">
      <input class="${element.type} form-check-input myInputRadio" name="moneyStorages" value="${element.type}" type="radio">
      <label class="form-check-label myLabel" for="moneyStorages${i+1}">${element.name} ${element.value}</label>
      </div>
      
    `    
    i++;
  });
  place.innerHTML = content;

}

initOperations();