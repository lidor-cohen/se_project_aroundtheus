import { isObjectEmpty } from "../utils/utils.js";

export default class Api {
  constructor({ baseUrl, authToken }) {
    this._apiURL = baseUrl;
    this._authToken = authToken;
  }

  apiCall({ endpoint, method, body = {} }) {
    const opt = {
      method,
      headers: {
        authorization: this._authToken,
        "Content-Type": "application/json",
      },
    };

    if (!isObjectEmpty(body)) opt.body = JSON.stringify(body);

    return fetch(this._apiURL + endpoint, opt)
      .then((res) => {
        return res.ok ? res.json() : Promise.reject(`Error: ${res.statusText}`);
      })
      .then((json) => {
        return json;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  getUser() {
    return this.apiCall({
      endpoint: "/users/me",
      method: "GET",
    });
  }

  getCards() {
    return this.apiCall({
      endpoint: "/cards",
      method: "GET",
    });
  }

  updateProfile({ name, about }) {
    return this.apiCall({
      endpoint: "/users/me",
      method: "PATCH",
      body: {
        name,
        about,
      },
    });
  }

  updateProfilePicture({ url }) {
    return this.apiCall({
      endpoint: "/users/me/avatar",
      method: "PATCH",
      body: {
        avatar: url,
      },
    });
  }

  addCard({ name, url }) {
    return this.apiCall({
      endpoint: "/cards",
      method: "POST",
      body: {
        name,
        link: url,
      },
    });
  }

  deleteCard({ cardId }) {
    return this.apiCall({
      endpoint: `/cards/${cardId}`,
      method: "DELETE",
    });
  }

  like({ cardId }) {
    return this.apiCall({
      endpoint: `/cards/${cardId}/likes`,
      method: "PUT",
    });
  }

  unlike({ cardId }) {
    return this.apiCall({
      endpoint: `/cards/${cardId}/likes`,
      method: "DELETE",
    });
  }

  deleteAllCards() {
    this.getInitialCards()
      .then((data) => {
        const promiseArr = data.map((item) => {
          return this.deleteCard({ cardId: item._id });
        });

        return Promise.all(promiseArr);
      })
      .then(() => {
        console.log(`All cards have been deleted!`);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

// 7fef8830-65a5-4840-8327-1cd6adab3c4d
