export const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        user: action.payload
      };
    // case "DELETE_USER":
    //   return {
    //     user: {}
    //   };
  }
};
