import { GET_DIALOG_MESSAGES } from '../actionTypes/index';

const addDialogs = payload => ({ type: GET_DIALOG_MESSAGES, payload });

export const getDialogs = (dialogs, id) => dispatch => dispatch(addDialogs({ array: dialogs, id }));
