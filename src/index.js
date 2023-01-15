import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import { Provider, useSelector } from 'react-redux';
import { createStore } from './store/store';
import {
  titleChanged,
  taskDeleted,
  completeTask,
  getTasks,
} from './store/task';
const store = createStore();
function App() {
  const state = useSelector((state) => state);
  console.log(state);

  useEffect(() => {
    store.dispatch(getTasks());
  }, []);
  const changeTitle = (taskID) => {
    store.dispatch(titleChanged(taskID));
  };
  const deleteTask = (taskID) => {
    store.dispatch(taskDeleted(taskID));
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
                  store.dispatch(completeTask(item.id));
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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
