import { GET_DIALOG_MESSAGES, RECEIVE_MESSAGE } from '../actionTypes/index';

const initialStateObject = {};

export const dialogs = (state = initialStateObject, action) => {
  switch (action.type) {
    case GET_DIALOG_MESSAGES: {
      return { ...state, [action.payload.id]: action.payload.array };
    }
    case RECEIVE_MESSAGE: {
      return { ...state, [action.payload.id]: [...state[action.payload.id], action.payload.message] };
    }
    default:
      return state;
  }
};
