// const INITIAL_STATE = {
//   currentUser: 12345,
// };

const userReducer = (currentUser = null, action) => {
  if (action.type === "SET_CURRENT_USER") {
    return action.payload;
  } else if (action.type === "DEL_CURRENT_USER") {
    return null;
  }

  return currentUser;
};

// const userReducer = (state = INITIAL_STATE, action) => {
//   console.log(action);
//   console.log("in reducer");

//   switch (action.type) {
//     case "SET_CURRENT_USER":
//       console.log(action);
//       return {
//         ...state,
//         currentUser: action.payload,
//       };

//     case "DEL_CURRENT_USER":
//       return {
//         currentUser: null,
//       };

//     default:
//       return state;
//   }
// };

export default userReducer;
