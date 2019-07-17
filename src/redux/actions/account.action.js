import { LOGIN_SUCCESS } from '../actionTypes/index';
import accountService from '../../services/account.service';
import { history } from '../../routing/history';
import { getUserDetails } from './userDetails.action';

const success = user => ({ type: LOGIN_SUCCESS, payload: user });
const failure = error => ({ type: LOGIN_FAILURE, payload: error });

export const login = (username, password) => (dispatch) => {
  accountService.login(username, password).then(
    (token) => {
      dispatch(success(token));
      dispatch(getUserDetails(token));
      history.push('/');
    },
    error => dispatch(failure(error.toString()))
  );
};

export const loginWithExternals = accessToken => (dispatch) => {
  accountService.loginWithGoogleAccesToken(accessToken).then(
    (user) => {
      dispatch(success(user));
      history.push('/');
    },
    error => dispatch(failure(error.toString()))
  );
};

export const loginWithAccessToken = accessToken => (dispatch) => {
  accountService.loginWithAccessToken(accessToken).then(
    (user) => {
      dispatch(success(user));
    },
    error => dispatch(failure(error.toString()))
  );
};

export const register = (email, password) => (dispatch) => {
  accountService.register(email, password).then(
    (token) => {
      dispatch(success(token));
      dispatch(getUserDetails(token));

      history.push('/');
    },
    error => dispatch(failure(error.toString()))
  );
};
