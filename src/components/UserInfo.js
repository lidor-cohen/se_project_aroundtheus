export default class UserInfo {
  constructor({ nameElement, jobElement, pfpElement }) {
    this._nameElement = nameElement;
    this._jobElement = jobElement;
    this._pfpElement = pfpElement;
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
      pfpURL: this._pfpElement.src,
    };
  }

  setUserInfo({ name, job, id, pfpURL }) {
    if (name) this._nameElement.textContent = name;
    if (job) this._jobElement.textContent = job;
    if (id) this._id = id;
    if (pfpURL) this._pfpElement.src = pfpURL;
  }
}
