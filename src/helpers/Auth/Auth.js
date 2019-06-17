/* eslint-disable consistent-return */
import auth0 from 'auth0-js';
import { AUTH_CONFIG } from './auth0-variables';

export default class Auth {
  accessToken;

  idToken;

  expiresAt;

  userProfile;

  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.callbackUrl,
    audience: AUTH_CONFIG.apiUrl,
    responseType: 'token',
    scope: 'openid profile email'
  });

  login = () => {
    this.auth0.authorize();
  };

  redirectToTarget = (props) => {
    props.history.push('/');
  };

  handleAuthentication = (loginWithExternals) => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken) {
        this.setSession(authResult);
        loginWithExternals(authResult.accessToken);
      }
    });
  };

  getAccessToken = () => this.accessToken;

  getIdToken = () => this.idToken;

  getAuth = () => this.auth0;

  setSession = (authResult) => {
    const expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
    this.accessToken = authResult.accessToken;
    this.expiresAt = expiresAt;
  };

  renewSession = () => {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        this.logout();
      }
    });
  };

  logout = () => {
    // Remove tokens and expiry time
    this.accessToken = null;
    this.expiresAt = 0;

    this.auth0.logout({
      returnTo: window.location.origin
    });
  };

  isAuthenticated = () => {
    // Check whether the current time is past the
    // access token's expiry time
    const { expiresAt } = this;
    return new Date().getTime() < expiresAt;
  };
}
