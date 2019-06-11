import { RECEIVE_MESSAGE } from '../actionTypes';

const updateDialog = (message, id) => ({ type: RECEIVE_MESSAGE, payload: { message, id } });

export const receiveMessage = (message, id) => dispatch => dispatch(updateDialog(message, id));
