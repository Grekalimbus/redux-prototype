import React from 'react';

// Reducer - функция, которая принимает состояние, action, и далее в зависимости от action.type через switch реазиловываем действие
function taskReducer(state, action) {
  switch (action.type) {
    case 'task/completed':
      const newArray = [...state];
      const elementIndex = newArray.findIndex(
        (el) => el.id === action.payload.id
      );
      newArray[elementIndex].completed = true;
      return newArray;
      break;
    default:
      break;
  }
}

function createStore(reducer, initialState) {
  // state - состояние
  let state = initialState;
  function getState() {
    return state;
  }
  // функция, меняющая состояние
  function dispatch(action) {
    state = reducer(state, action);
  }
  return { getState, dispatch };
}
// переменная, где в createStore пушится изначальное состояние
const store = createStore(taskReducer, [
  { id: 1, description: 'Task 1', completed: false },
  { id: 2, description: 'Task 2', completed: false },
]);
function App() {
  const state = store.getState();
  const completeTask = (taskID) => {
    store.dispatch({ type: 'task/completed', payload: { id: taskID } });
    console.log(store.getState());
  };

  return (
    <div>
      App
      <ul>
        {state.map((item) => {
          return (
            <li key={item.id}>
              <p>{` ${item.description}`}</p>
              <p>{`completed: ${item.completed}`}</p>
              <button
                onClick={() => {
                  completeTask(item.id);
                }}
              >
                Complete
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
