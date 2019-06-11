export default class HttpClient {
  accessToken;

  constructor(token) {
    this.accessToken = token;
  }

  call = async url => fetch(url, {
    headers: {
      Authorization: `Bearer ${this.accessToken}`
    }
  });
}
