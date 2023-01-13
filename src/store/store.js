import {
  legacy_createStore as configureStore,
  compose,
  applyMiddleware,
} from 'redux';
import { logger } from './middleware/logger';
import { thunk } from './middleware/thunk';
import taskReducer from './task';

const middlewareEnhancer = applyMiddleware(logger, thunk);

export function initiateState() {
  return configureStore(
    taskReducer,
    compose(
      middlewareEnhancer,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );
}
