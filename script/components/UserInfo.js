export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._profileName = document.querySelector(nameSelector);
    this._profileJob = document.querySelector(jobSelector);
  }

  getUserInfo() {
    const userInfo = {
      profileName: this._profileName.textContent,
      profileJob: this._profileJob.textContent,
    };
    console.log(userInfo);
    return userInfo;
  }

  setUserInfo({ profileName, profileJob }) {
    this._profileName.textContent = profileName;
    this._profileJob.textContent = profileJob;
  }
}
