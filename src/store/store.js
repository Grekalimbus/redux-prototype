import { legacy_createStore as configureStore } from 'redux';
import taskReducer from './task';

export function initiateState() {
  return configureStore(
    taskReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}
