import { GET_DIALOG_LIST } from '../actionTypes/index';
import HttpClient from '../../services/helpers/HttpClient';

const getActiveUsers = async (token) => {
  const client = new HttpClient(token);
  const request = await client.call('http://10.26.7.68:4000/api/user/getall');
  return request.json();
};

const addDialogList = dialogs => ({ type: GET_DIALOG_LIST, payload: dialogs });

export const getDialogList = token => (dispatch) => {
  getActiveUsers(token).then(dialogs => dispatch(addDialogList(dialogs)));
};
