export default class UserInfo {
	constructor({ nameSelector, jobSelector, imgSelector }) {
		this._profileName = document.querySelector(nameSelector);
		this._profileJob = document.querySelector(jobSelector);
		this._profileImage = document.querySelector(imgSelector);
	}

	getUserInfo() {
		const userInfo = {
			profileName: this._profileName.textContent,
			profileJob: this._profileJob.textContent,
			profileImg: this._profileImage.src
		};
		return userInfo;
	}

	setUserInfo(data) {
		this._profileName.textContent = data.name;
		this._profileJob.textContent = data.about;
		this._profileImage.src = data.avatar;
		this._userId = data._id;
	}

	returnUserId() {
		return this._userId;
	}
}
