import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { dialogList } from './dialogList.reducer';
import { dialogs } from './dialogs.reducer';
import { authentication } from './authentication.reducer';
import { connection } from './connection.reducer';

export default history => combineReducers({
  router: connectRouter(history),
  dialogList,
  dialogs,
  user: authentication,
  connection
});
