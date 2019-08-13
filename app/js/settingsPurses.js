let $btnCreatPurse = document.querySelector('.js-btnCreatePurse');
let $chooseClassPurse = document.querySelector('.js-chooseClassPurse');
let $purseName = document.querySelector('.js-purseName');
let $purseBalance = document.querySelector('.js-purseBalance');
let $purses = document.querySelector('.purses');
let $btnPurses = document.querySelector('.js-purseSettings');
let purses, cards, contributions, moneyboxes;

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
      appData.moneyStorage.push({ type: $chooseClassPurse.value, name: $purseName.value, value: getFloat($purseBalance.value) });
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
  let $tablePurses = document.querySelector('.tablePurses')
  let $tableCards = document.querySelector('.tableCards')
  let $tableContributions = document.querySelector('.tableContributions')
  let $tableMoneyBoxes = document.querySelector('.tableMoneyBoxes')
  let tablePursesInner = '';
  let tableCardsInner = '';
  let tableContributionsInner = '';
  let tablemoneyBoxesInner = '';
  function tableRender(x, z, c, zz) {
    x.forEach(function (item, i) {
      if (item !== null) {
        z += `<tr>
          <th>${i + 1}</th>
          <td>${item.name}</td>
          <td>${item.value}</td>
          <td><button class="btn btn-primary delete${zz}"> Удалить </button></td>`;
      }
    });
    z += "</tr>"
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




