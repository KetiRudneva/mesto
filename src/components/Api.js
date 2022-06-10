export default class Api {
	constructor(options) {
		this._baseUrl = options.baseUrl;
		this._headers = options.headers;
	}

	_handleError(res) {
		if (res.ok) {
			return res.json();
		}
		return Promise.reject(`Произошла ошибка ${res.status}`);
	}

	async getUserData() {
		const res = await fetch(`${this._baseUrl}users/me`, {
			method: 'GET',
			headers: this._headers
		});
		return this._handleError(res);
	}

	async getCards() {
		const res = await fetch(`${this._baseUrl}cards`, {
			method: 'GET',
			headers: this._headers
		});
		return this._handleError(res);
	}

	async editUserInfo(data) {
		const res = await fetch(`${this._baseUrl}users/me`, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify({
				name: data.name,
				about: data.about
			})
		});
		return this._handleError(res);
	}

	async addNewCard(data) {
		const res = await fetch(`${this._baseUrl}cards`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify({
				name: data.name,
				link: data.link
			})
		});
		return this._handleError(res);
	}

	async addLikes(id) {
		const res = await fetch(`${this._baseUrl}cards/${id}/likes`, {
			method: 'PUT',
			headers: this._headers
		});
		return this._handleError(res);
	}

	async removeLikes(id) {
		const res = await fetch(`${this._baseUrl}cards/${id}/likes`, {
			method: 'DELETE',
			headers: this._headers
		});
		return this._handleError(res);
	}
}
