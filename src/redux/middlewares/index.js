import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux';
import logger from 'redux-logger';
import signalRMiddleware from './signalR.middleware';


export default applyMiddleware(thunk, logger, signalRMiddleware);
