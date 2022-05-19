export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(jobSelector);
  }

  getUserInfo() {
    const userInfo = {
      name: this._name,
      about: this._about,
    };
    return userInfo;
  }

  setUserInfo({ name, about }) {
    this._name.textContent = name;
    this._about.textContent = about;
  }
}
