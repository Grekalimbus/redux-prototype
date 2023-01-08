import React from 'react';

function createStore(initialState) {
  let state = initialState;
  function getState() {
    return state;
  }
  function dispatch(action) {
    console.log(action);
    if (action.type === 'task/completed') {
      const newArray = [...state];
      const elementIndex = newArray.findIndex(
        (el) => el.id === action.payload.id
      );
      newArray[elementIndex].completed = true;
      state = newArray;
      console.log(state);
    }
  }
  return { getState, dispatch };
}
const store = createStore([{ id: 1, description: 'Task 1', completed: false }]);
function App() {
  console.log(store.getState());

  return (
    <div>
      App
      <button
        onClick={() => {
          store.dispatch({ type: 'task/completed', payload: { id: 1 } });
        }}
      >
        Complete
      </button>
    </div>
  );
}

export default App;
