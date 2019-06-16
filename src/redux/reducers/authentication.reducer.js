import { LOGIN_SUCCESS } from '../actionTypes/index';

const initialStateObject = {
  username: '',
  id: 0,
  email: '',
  pictureUrl: '',
  name: '',
  userIdentifier: ''
};

export const authentication = (state = initialStateObject, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      return action.payload;
    }
    default:
      return state;
  }
};
