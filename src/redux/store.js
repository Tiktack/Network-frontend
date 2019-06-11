import { createStore } from 'redux';
import rootReducer from './reducers';
import middlewares from './middlewares';
import { history } from '../routing/history';

const store = createStore(rootReducer(history), middlewares);

export default store;
