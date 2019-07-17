import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { dialogList } from './dialogList.reducer';
import { dialogs } from './dialogs.reducer';
import { connection } from './connection.reducer';
import { userDetails } from './userDetails.reducer';

export default history => combineReducers({
  router: connectRouter(history),
  dialogList,
  dialogs,
  user: userDetails,
  connection
});
