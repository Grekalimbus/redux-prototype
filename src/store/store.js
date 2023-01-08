import { legacy_createStore as configureStore } from 'redux';
import taskReducer from './taskReducer';

const initialState = [
  { id: 1, title: 'Task 1', completed: false },
  { id: 2, title: 'Task 2', completed: false },
];

export function initiateState() {
  return configureStore(taskReducer, initialState);
}
