class Api {
  constructor(baseURL, authToken) {
    this._baseURL = baseURL;
    this._authToken = authToken;
    this._headers = {
      authorization: authToken,
      "Content-Type": "application/json",
    };
  }

  _processServerResponse = (res) => {
    if (res.ok) {
      return res.json();
    }

    console.log(`Error: ${res.status}`);
    return Promise.reject(`Error: ${res.status}`);
  };

  getInitialCards() {
    return fetch(`${this._baseURL}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then(this._processServerResponse);
  }

  getUserInfo() {
    return fetch(`${this._baseURL}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this._processServerResponse);
  }

  getApiInfo() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]).then(
      this._processServerResponse
    );
  }

  setUserInfo(data) {
    return fetch(`${this._baseURL}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._processServerResponse);
  }

  setAvatar(data) {
    return fetch(`${this._baseURL}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data,
      }),
    }).then(this._processServerResponse);
  }

  addCard(data) {
    return fetch(`${this._baseURL}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
        likes: data.likes,
      }),
    }).then(this._processServerResponse);
  }

  deleteCard(data) {
    return fetch(`${this._baseURL}/cards/${data}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._processServerResponse);
  }

  addLike(data) {
    return fetch(`${this._baseURL}/cards/likes/${data}`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._processServerResponse);
  }

  removeLike(data) {
    return fetch(`${this._baseURL}/cards/likes/${data}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._processServerResponse);
  }
}

export default Api;
