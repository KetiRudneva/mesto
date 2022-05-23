export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._profileName = document.querySelector(nameSelector);
    this._profileJob = document.querySelector(jobSelector);
  }

  getUserInfo() {
    const userInfo = {
      profileName: this._profileName.value,
      profileJob: this._profileJob.value,
    };
    return userInfo;
  }

  setUserInfo({ profileName, profileJob }) {
    this._profileName.textContent = profileName;
    this._profileJob.textContent = profileJob;
  }
}
