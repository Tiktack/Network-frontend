import { GET_DIALOG_LIST } from '../actionTypes/index';
import HttpClient from '../../services/helpers/HttpClient';
import { API_URL_BASE } from '../../services/constants';

const getActiveUsers = async (token) => {
  const client = new HttpClient(token);
  const request = await client.call(`${API_URL_BASE}user/getall`);
  return request.json();
};

const addDialogList = dialogs => ({ type: GET_DIALOG_LIST, payload: dialogs });

export const getDialogList = token => (dispatch) => {
  getActiveUsers(token).then(dialogs => dispatch(addDialogList(dialogs)));
};
