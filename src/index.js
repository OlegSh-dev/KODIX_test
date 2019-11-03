import './style.css';

import Card from './js/Card';
import Api from './js/Api';
import Form from './js/Form';

const url = 'https://rawgit.com/Varinetz/e6cbadec972e76a340c41a65fcc2a6b3/raw/90191826a3bac2ff0761040ed1d95c59f14eaf26/frontend_test_table.json';

const mainForm = document.querySelector('.main-form');
const formTitle = document.querySelector('#title');
const formYear = document.querySelector('#year');
const formPrice = document.querySelector('#price');
const formDescription = document.querySelector('#description');
const formStatus = document.querySelector('#status');

const cardsContainer = document.querySelector('.cards-container');

const colors = document.querySelector('#colors');
const colorsItems = colors.querySelectorAll('span');

const selectStatus = document.querySelector('#selectstatus');
const selectList = document.querySelector('#selectlist');

const submit = document.querySelector('.submit');

const warning = document.querySelector('.warning');
const success = document.querySelector('.success');

const api = new Api(url);

// реализация появления контента страницы только после полной загрузки
window.addEventListener('load', () => {
  document.body.style.visibility = 'visible';
});

// загружаем карточки с удаленного json
api.getCards()
  .then((data) => {
    data.forEach((item) => {
      new Card(cardsContainer, item);
    });
  })
  .catch((err) => console.error(`Ошибка получения данных: ${err}`));

// обработчик на выбор цвета
colors.addEventListener('click', (event) => {
  colorsItems.forEach((item) => {
    item.classList.remove('color-mark_pressed');
  });

  if (event.target.tagName === 'SPAN') {
    event.target.classList.add('color-mark_pressed');
  }
});

// обработчик на открытие меню селекта со статусом
selectStatus.addEventListener('click', () => {
  selectList.classList.toggle('hidden');
});

// обработчик на выбор пункта меню статуса
selectList.addEventListener('click', (event) => {
  if (event.target.tagName === 'LI') {
    const selectText = selectStatus.querySelector('p');
    selectText.textContent = event.target.textContent;
    selectText.style.color = 'black';
  }
});

// обработчик для инпутов формы, чтобы появлялось название поля сверху при вводе текста
mainForm.addEventListener('input', (event) => {
  if (event.target.value.length !== 0) {
    event.target.previousElementSibling.classList.remove('invisible');
  } else {
    event.target.previousElementSibling.classList.add('invisible');
  }
});

// обработчик на отправку данных из формы
submit.addEventListener('click', () => {
  const obj = new Form(
    formTitle.value.trim(),
    formYear.value,
    formPrice.value,
    formDescription.value.trim(),
    formStatus.textContent,
    colorsItems,
  );

  obj.id = Date.now();

  if (obj.checkNewCardFromForm(obj)) {
    new Card(cardsContainer, obj);

    obj.resetForm(formTitle, formYear, formPrice, formDescription, formStatus, colorsItems);

    mainForm.querySelectorAll('input').forEach((item) => item.previousElementSibling.classList.add('invisible'));

    obj.showSuccess(success);
  } else {
    obj.showWarning(warning);
  }
});

// обработчик на клик по заголовку таблицы для сортировки данных
document.querySelector('.table-header').addEventListener('click', (event) => {
  if (event.target.classList.contains('table_year')) {
    document.querySelector('.table_year').classList.toggle('pressed');
    Card.sortCards(event.target.dataset.sort, event.target);
  }

  if (event.target.classList.contains('table_price')) {
    document.querySelector('.table_price').classList.toggle('pressed');
    Card.sortCards(event.target.dataset.sort, event.target);
  }
});
