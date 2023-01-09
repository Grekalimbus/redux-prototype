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
  const deleteTask = (taskID) => {
    store.dispatch(actions.taskDeleted(taskID));
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
                className="btn btn-primary m-2"
                onClick={() => {
                  completeTask(item.id);
                }}
              >
                Complete
              </button>
              <button
                className="btn btn-success m-2"
                onClick={() => {
                  changeTitle(item.id);
                }}
              >
                Change title
              </button>
              <button
                className="btn btn-danger m-2"
                onClick={() => {
                  deleteTask(item.id);
                }}
              >
                Delete task
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
