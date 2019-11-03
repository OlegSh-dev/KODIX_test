/* eslint-disable class-methods-use-this */
import { statusValues } from './dictionary';

/**
 * Класс для сущности формы
 */
export default class Form {
  /**
   * @param {string} title - значения полей формы
   * @param {string} year
   * @param {string} price
   * @param {string} description
   * @param {string} status
   * @param {NodeList} colorItems - нодлист со спанами цвета для определения выбранного цвета
   */
  constructor(title, year, price, description, status, colorItems) {
    this.title = title;
    this.year = year;
    this.price = +price;
    this.description = description;
    this.status = statusValues[status];
    this.color = this.getColorValue(colorItems);
  }

  /**
   * Метод для определения выбранного пользователем цвета
   * @param {NodeList} colorsItems
   * @returns null - если не выбрано, строку с названием цвета - если был выбран цвет
   */
  getColorValue(colorsItems) {
    const colorValue = [...colorsItems].filter((item) => item.classList.contains('color-mark_pressed'));

    if (!colorValue[0]) {
      return null;
    }
    return colorValue[0].dataset.color;
  }

  /**
   * Метод для проверки на заполненность всех полей формы
   * @param {Object} obj - сформированный объект при клике на кнопку сабмита формы
   */
  checkNewCardFromForm(obj) {
    let check = true;

    Object.values(obj).forEach((value) => {
      if (!value) {
        check = false;
      }
    });

    return check;
  }

  /**
   * Метод для очистки формы после отправки данных
   * @param {HTMLElement} title
   * @param {HTMLElement} year
   * @param {HTMLElement} price
   * @param {HTMLElement} description
   * @param {HTMLElement} status
   * @param {NodeList} colorItems
   */
  resetForm(title, year, price, description, status, colorItems) {
    title.value = '';
    year.value = '';
    price.value = '';
    description.value = '';
    status.textContent = 'Статус';
    status.style.color = 'var(--grey-color)';
    colorItems.forEach((item) => {
      item.classList.remove('color-mark_pressed');
    });
  }

  /**
   * Метод для отображение предупреждения при незаполненных полях формы
   * @param {HTMLElement} warning - элемент с предупреждением
   */
  showWarning(warning) {
    warning.classList.remove('hidden');

    setTimeout(() => {
      warning.classList.add('hidden');
    }, 5000);
  }

  showSuccess(success) {
    success.classList.remove('hidden');

    setTimeout(() => {
      success.classList.add('hidden');
    }, 2000);
  }
}
