export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _handleError(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Произошла ошибкаЖ ${res.status}`);
  }

  async getUserData() {
    const res = await fetch(`${this._baseUrl}users/me`, {
      method: "GET",
      headers: this._headers,
    });
    return this._handleError(res);
  }

  async getCards() {
    const res = await fetch(`${this._baseUrl}cards`, {
      method: "GET",
      headers: this._headers,
    });
    return this._handleError(res);
  }
}
