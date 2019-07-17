import { GET_USER_DETAILS } from '../actionTypes';
import userService from '../../services/user.service';

const success = user => ({ type: GET_USER_DETAILS, payload: user });
const failure = error => ({ type: LOGIN_FAILURE, payload: error });

export const getUserDetails = token => (dispatch) => {
  userService.getUserDetails(token).then(
    (user) => {
      dispatch(success(user));
    },
    error => dispatch(failure(error.toString()))
  );
};
