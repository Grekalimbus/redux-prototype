import React, { useEffect, useState } from 'react';

// Reducer - функция, которая принимает состояние, action, и далее в зависимости от action.type через switch реазиловываем действие
function taskReducer(state, action) {
  switch (action.type) {
    case 'task/updated':
      {
        const newArray = [...state];
        const elementIndex = newArray.findIndex(
          (el) => el.id === action.payload.id
        );
        newArray[elementIndex] = {
          ...newArray[elementIndex],
          ...action.payload,
        };
        return newArray;
      }
      break;
    default:
      break;
  }
}

function createStore(reducer, initialState) {
  // state - состояние
  let state = initialState;
  let listeners = [];
  function getState() {
    return state;
  }
  // функция, меняющая состояние
  function dispatch(action) {
    state = reducer(state, action);
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      listener();
    }
  }
  function subscribe(listener) {
    listeners.push(listener);
  }
  return { getState, dispatch, subscribe };
}
// переменная, где в createStore пушится изначальное состояние
const store = createStore(taskReducer, [
  { id: 1, title: 'Task 1', completed: false },
  { id: 2, title: 'Task 2', completed: false },
]);
function App() {
  const [state, setState] = useState(store.getState());
  useEffect(() => {
    store.subscribe(() => {
      setState(store.getState());
    });
  }, []);
  const completeTask = (taskID) => {
    store.dispatch({
      type: 'task/updated',
      payload: { id: taskID, completed: true },
    });
  };
  const changeTitle = (taskID) => {
    store.dispatch({
      type: 'task/updated',
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
