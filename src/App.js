import React, { useEffect, useState } from 'react';
import { initiateState } from './store/store';
import * as actions from './store/actions';

const store = initiateState();
function App() {
  const [state, setState] = useState(store.getState());

  useEffect(() => {
    store.subscribe(() => {
      setState(store.getState());
    });
  }, []);

  const completeTask = (taskID) => {
    store.dispatch(actions.taskCompleted(taskID));
  };
  const changeTitle = (taskID) => {
    store.dispatch(actions.titleChanged(taskID));
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
