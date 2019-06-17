/* eslint-disable no-restricted-globals */
function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('token');
}

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
    body: JSON.stringify({ username, password })
  };

  const response = await fetch('http://10.26.7.68:4000/api/user/authenticate', requestOptions);
  const user = await handleResponse(response);
  // store user details and jwt token in local storage to keep user logged in between page refreshes
  localStorage.setItem('token', user.token);
  return user;
}

async function loginWithGoogleAccesToken(accessToken) {
  const requestOptions = {
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` }
  };

  const response = await fetch('http://10.26.7.68:4000/api/user/authenticateWithExternals', requestOptions);
  const user = await handleResponse(response);
  // store user details and jwt token in local storage to keep user logged in between page refreshes
  localStorage.setItem('token', user.token);
  return user;
}

async function loginWithAccessToken(accessToken) {
  const requestOptions = {
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` }
  };

  const response = await fetch('http://10.26.7.68:4000/api/user/authenticateWithToken', requestOptions);
  const user = await handleResponse(response);

  return user;
}

async function register(user) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  };

  const response = await fetch(`${config.apiUrl}/users/register`, requestOptions);
  return handleResponse(response);
}

async function update(user) {
  const requestOptions = {
    method: 'PUT',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  };

  const response = await fetch(`${config.apiUrl}/users/${user.id}`, requestOptions);
  return handleResponse(response);
}

// prefixed function name with underscore because delete is a reserved word in javascript
async function _delete(id) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader()
  };

  const response = await fetch(`${config.apiUrl}/users/${id}`, requestOptions);
  return handleResponse(response);
}

export const userService = {
  login,
  loginWithGoogleAccesToken,
  loginWithAccessToken,
  logout,
  register,
  update,
  delete: _delete
};
