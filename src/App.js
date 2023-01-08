import React, { useEffect, useState } from 'react';
import { taskUpdated } from './store/actionTypes';
import createStore from './store/createStore';
import taskReducer from './store/taskReducer';

// переменная, где в createStore пушится изначальное состояние
const initialState = [
  { id: 1, title: 'Task 1', completed: false },
  { id: 2, title: 'Task 2', completed: false },
];
const store = createStore(taskReducer, initialState);
function App() {
  const [state, setState] = useState(store.getState());
  useEffect(() => {
    store.subscribe(() => {
      setState(store.getState());
    });
  }, []);
  const completeTask = (taskID) => {
    store.dispatch({
      type: taskUpdated,
      payload: { id: taskID, completed: true },
    });
  };
  const changeTitle = (taskID) => {
    store.dispatch({
      type: taskUpdated,
      payload: { id: taskID, title: `New title for ${taskID}` },
    });
  };

  return (
    <div>
      App
      <ul>
        {state.map((item) => {
          return (
            <li key={item.id}>
              <p>{` ${item.title}`}</p>
              <p>{`completed: ${item.completed}`}</p>
              <button
                onClick={() => {
                  completeTask(item.id);
                }}
              >
                Complete
              </button>
              <button
                onClick={() => {
                  changeTitle(item.id);
                }}
              >
                Change title
              </button>
              <hr />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
