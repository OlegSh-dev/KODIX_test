/* eslint-disable class-methods-use-this */
/**
 * Класс для взаимодействия с бэкендом и сетевых запросов
 */
export default class Api {
  constructor(url) {
    this.url = url;
  }

  /**
   * Метод для запроса имеющихся в файле карточек автомобилей
   */
  getCards() {
    return fetch(this.url)
      .then((res) => this.checkResponse(res));
  }

  /**
   * Метод для проверки статуса ответа от сервера
   * @param {Object} res - полеченный ответ от сервера
   */
  checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }
}
