/* eslint-disable no-restricted-globals */

import { API_URL_BASE, AUTHENTICATION_ENDPOINT } from './constants';

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}

async function login(username, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: username, password })
  };
  const response = await fetch(`${API_URL_BASE}${AUTHENTICATION_ENDPOINT}/login`, requestOptions);
  const token = response.text();
  localStorage.setItem('token', token);
  return token;
}

async function loginWithGoogleAccesToken(accessToken) {
  const requestOptions = {
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` }
  };

  const response = await fetch(`${API_URL_BASE}${AUTHENTICATION_ENDPOINT}/authenticateWithExternals`, requestOptions);
  const user = await handleResponse(response);
  // store user details and jwt token in local storage to keep user logged in between page refreshes
  localStorage.setItem('token', user.token);
  return user;
}

async function loginWithAccessToken(accessToken) {
  const requestOptions = {
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` }
  };

  const response = await fetch(`${API_URL_BASE}${AUTHENTICATION_ENDPOINT}/10`, requestOptions);
  const user = await handleResponse(response);

  return user;
}

export const authenticationService = {
  login,
  loginWithGoogleAccesToken,
  loginWithAccessToken
};
