let $btnCreatPurse = document.querySelector('.js-btnCreatePurse');
let $chooseClassPurse = document.querySelector('.js-chooseClassPurse');
let $purseName = document.querySelector('.js-purseName');
let $purseBalance = document.querySelector('.js-purseBalance');
let delItemsPurses = [];
let delItemsCards = [];
let delItemsContributions = [];
let delItemsMoneyBoxes = [];

function init(){
  initForm();
  render();
}

function render() {
  delItemsPurses = [];
  delItemsCards = [];
  delItemsContributions = [];
  delItemsMoneyBoxes = [];
  renderPurses();
  delBtns();
}

function initForm() {
  $btnCreatPurse.addEventListener('click', function btnCreatPurse() {
    if ($purseName.value && $purseBalance.value !== ''){
    appData.moneyStorage[$chooseClassPurse.value][$purseName.value]= getFloat($purseBalance.value);
    localSt();
    render();  
  }else{
    $purseBalance.style.border = 'border: 2px red';
  }
  });
}

function renderPurses() {
  $purseName.value = "";
  $purseBalance.value = "";
  let $tablePurses = document.querySelector('.tablePurses')
  let $tableCards = document.querySelector('.tableCards')
  let $tableContributions = document.querySelector('.tableContributions')
  let $tableMoneyBoxes = document.querySelector('.tableMoneyBoxes')
  let tablePursesInner = '';
  let tableCardsInner = '';
  let tableContributionsInner = '';
  let tablemoneyBoxesInner = '';


  function tableRender(x, z, c, zz) {
    let i = 1;
    for (var item of Object.keys(x)) {
      if (item !== null) {
        z+= "<tr> <th>"+i+"</th> <td>"+item+"</td><td>"+x[item]+"</td><td><button class=\"btn btn-primary delete" + zz + "\">" + "Удалить" + "</button></td>";
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
    z+="</tr>"
    c.innerHTML = z;
  }

  tableRender(appData.moneyStorage.purse, tablePursesInner, $tablePurses, "Purses");
  tableRender(appData.moneyStorage.card, tableCardsInner, $tableCards, "Cards");
  tableRender(appData.moneyStorage.contribution, tableContributionsInner, $tableContributions, "Contributions");
  tableRender(appData.moneyStorage.moneybox, tablemoneyBoxesInner, $tableMoneyBoxes, "Moneyboxs");
}

function delBtns() {
  var $btnDeletePurses = document.querySelectorAll('.deletePurses');
  var $btnDeleteCards = document.querySelectorAll('.deleteCards');
  var $btnDeleteContributions = document.querySelectorAll('.deleteContributions');
  var $btnDeleteMoneyboxs = document.querySelectorAll('.deleteMoneyboxs');
  function btnsAllMoneyStorage(x, y, c) {
    for (let i = 0; i < Object.keys(x).length; i++) {
      y[i].addEventListener('click', function btnDelete() {
        delete x[c[i]];
        localSt();
        render();
      });
    }
  }
  btnsAllMoneyStorage(appData.moneyStorage.purse, $btnDeletePurses, delItemsPurses);
  btnsAllMoneyStorage(appData.moneyStorage.card, $btnDeleteCards, delItemsCards);
  btnsAllMoneyStorage(appData.moneyStorage.contribution, $btnDeleteContributions, delItemsContributions);
  btnsAllMoneyStorage(appData.moneyStorage.moneybox, $btnDeleteMoneyboxs, delItemsMoneyBoxes);
}

init();





