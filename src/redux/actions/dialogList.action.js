import { GET_DIALOG_LIST } from '../actionTypes/index';

const getActiveUsers = async () => {
  const request = await fetch('http://10.26.7.68:4000/api/user/getall');
  return request.json();
};

const addDialogList = dialogs => ({ type: GET_DIALOG_LIST, payload: dialogs });

export const getDialogList = () => (dispatch) => {
  getActiveUsers().then(dialogs => dispatch(addDialogList(dialogs)));
};
