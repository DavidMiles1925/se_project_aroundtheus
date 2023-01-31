class UserInfo {
  constructor(name, about) {
    this._currentName = document.querySelector(name);
    this._currentAbout = document.querySelector(about);
  }

  getUserInfo() {
    this._name.value = this._currentName.textContent;
    this._aboutSelector.value = this._currentAbout.textContent;
  }

  setUserInfo() {}
}

export default UserInfo;
