class UserInfo {
  constructor(name, about) {
    this._name = name;
    this._about = about;
  }

  getUserInfo() {
    this._nameText = document.querySelector(this._name).textContent;
    this._aboutText = document.querySelector(this._about).textContent;
    return { name: this._nameText, about: this._aboutText };
  }

  setUserInfo(name, about) {
    this._newName = document.querySelector(this._name);
    this._newAbout = document.querySelector(this._about);
    this._newName.textContent = name;
    this._newAbout.textContent = about;
  }
}

export default UserInfo;
