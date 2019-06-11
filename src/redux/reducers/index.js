import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { dialogList } from './dialogList.reducer';
import { dialogs } from './dialogs.reducer';

export default history => combineReducers({
  router: connectRouter(history),
  dialogList,
  dialogs
});
