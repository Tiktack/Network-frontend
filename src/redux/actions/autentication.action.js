import { LOGIN_SUCCESS } from '../actionTypes/index';
import { userService } from '../../services/user.service';
import { history } from '../../routing/history';

const success = user => ({ type: LOGIN_SUCCESS, payload: user });
const failure = error => ({ type: LOGIN_FAILURE, payload: error });

export const login = (username, password) => (dispatch) => {
  userService.login(username, password).then(
    (user) => {
      dispatch(success(user));
      history.push('/');
    },
    error => dispatch(failure(error.toString()))
  );
};

export const loginWithExternals = accessToken => (dispatch) => {
  userService.loginWithGoogleAccesToken(accessToken).then(
    (user) => {
      dispatch(success(user));
      history.push('/');
    },
    error => dispatch(failure(error.toString()))
  );
};

export const loginWithAccessToken = accessToken => (dispatch) => {
  userService.loginWithAccessToken(accessToken).then(
    (user) => {
      dispatch(success(user));
    },
    error => dispatch(failure(error.toString()))
  );
};
