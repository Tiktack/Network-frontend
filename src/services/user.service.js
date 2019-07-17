/* eslint-disable no-return-await */
import { API_URL_BASE, USER_ENDPOINT } from './constants';

async function getUserDetails(accessToken) {
  const requestOptions = {
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` }
  };

  const response = await fetch(`${API_URL_BASE}${USER_ENDPOINT}/userdetails`, requestOptions);
  return await response.json();
}

async function updateUser() {
  // TODO
}

async function deleteUser() {
  // TODO
}

export default {
  updateUser,
  deleteUser,
  getUserDetails
};
