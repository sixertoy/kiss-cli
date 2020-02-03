const DEFAULT_STATE = false;

export const reducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case 'onChanger':
      return action.data;
    default:
      return state;
  }
};

export default reducer;
