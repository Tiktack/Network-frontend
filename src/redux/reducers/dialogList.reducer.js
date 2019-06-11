import { GET_DIALOG_LIST } from '../actionTypes/index';

const initialStateObject = [];

export const dialogList = (state = initialStateObject, action) => {
  switch (action.type) {
    case GET_DIALOG_LIST: {
      return [...action.payload];
    }
    default:
      return state;
  }
};
