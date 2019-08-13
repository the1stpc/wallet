let $chooseArticle = document.querySelector('.js-chooseArticle');
let $chooseArticlesName = document.querySelector('.js-chooseArticlesName');
let $choosePurses = document.querySelector('.js-choosePurses');

function initOperations() {
  renderChooseArticle();
  renderChoosePurse();
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

function renderChoosePurse() {
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

initOperations();