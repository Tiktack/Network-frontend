import { GET_USER_DETAILS } from '../actionTypes/index';

const initialStateObject = {
  firstName: '',
  secondName: '',
  email: '',
  avatar: '',
  id: 0
};

export const dialogList = (state = initialStateObject, action) => {
  switch (action.type) {
    case GET_USER_DETAILS: {
      return [...action.payload];
    }
    default:
      return state;
  }
};
