import { statusIdentification } from './dictionary';

/**
 * Класс для сущности карточки с информацией об автомобиле
 */
export default class Card {
  /**
   * @param {HTMLElement} container - элемент контейнера для прикрепления карточки
   * @param {Object} props - объект со свойствами карточки
   */
  constructor(container, props) {
    this.container = container;
    this.id = props.id;
    this.title = props.title;
    this.description = props.description;
    this.year = props.year;
    this.color = props.color;
    this.status = props.status;
    this.price = props.price;

    this.element = this.create();
    this.render();
    this.addListeners();
  }

  /**
   * Метод для создания html-элемента с разметкой карточки
   * @returns {HTMLElement}
   */
  create() {
    const stringHTML = `
      <div class="card__info">
        <div class="card__text">
          <p class="card__title">${this.title}</p>
          <p class="card__description">${this.description}</p>
        </div>
        <div class="card__props">
          <div class="card__not-text">
            <p class="card__year">${this.year}</p>
            <span class="color-mark color-mark_${this.color} card__color-mark"></span>
          </div>
          <p class="card__status">${statusIdentification[this.status]}</p>
        </div>
      </div>
      <div class="card__additional">
        <p class="card__price">${this.price.toLocaleString()} руб.</p>
        <button class="card__button">Удалить</button>
      </div>`;

    const template = document.createElement('div');
    template.classList.add('card');

    template.insertAdjacentHTML('afterbegin', stringHTML);

    return template;
  }

  /**
   * Метод для отрисовки карточки на странице, присоединение к DOMу
   */
  render() {
    this.container.appendChild(this.element);
  }

  /**
   * Метод для навешивания необходимых слушателей событий
   */
  addListeners() {
    this.element.addEventListener('click', (event) => {
      if (event.target.tagName === 'BUTTON') {
        this.deleteCard();
      }
    });
  }

  /**
   * Метод для удаления карточки из DOM
   */
  deleteCard() {
    if (confirm('Данная позиция будет удалена')) {
      this.element.remove();
    }
  }

  /**
   * Статический метод для сортировки карточек в таблице
   * @param {string} key - по какому параметру будет производиться сортировка
   * @param {HTMLElement} target - параметр для отслеживания факта нажатия на заголовок таблицы,
   * чтобы менять направление сортировки
   */
  static sortCards(key, target) {
    const cardContainer = document.querySelector('.cards-container');
    const cardsArr = [...document.querySelectorAll('.card')];

    const regExp = /&nbsp;/g;

    /**
     * Вспомогательная функция для получения из элемента значения для сортировки
     * @param {HTMLElement} card
     */
    const getSortParam = (card) => parseInt(card.querySelector(`.card__${key}`).innerHTML.replace(regExp, ''), 10);

    if (!target.classList.contains('pressed')) {
      cardsArr.sort((card1, card2) => getSortParam(card1) - getSortParam(card2));
    } else {
      cardsArr.sort((card1, card2) => getSortParam(card2) - getSortParam(card1));
    }

    cardContainer.innerHTML = '';

    for (let card of cardsArr) {
      cardContainer.appendChild(card);
    }
  }
}
