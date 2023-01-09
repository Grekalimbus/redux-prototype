import * as actionsType from './actionTypes';

function taskReducer(state = [], action) {
  switch (action.type) {
    case actionsType.taskUpdated: {
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
    case actionsType.taskDelete:
      {
        const newArray = [...state];
        const elementIndex = newArray.findIndex(
          (el) => el.id === action.payload.id
        );
        newArray.splice(elementIndex, 1);
        return newArray;
      }
      break;
    default:
      return state;
  }
}

export default taskReducer;
