import { legacy_createStore as configureStore } from 'redux';
import taskReducer from './task';

export function initiateState() {
  return configureStore(taskReducer);
}
