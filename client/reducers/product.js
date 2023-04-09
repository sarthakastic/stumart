export default (state = { isLoading: true, posts: [] }, action) => {
  switch (action.type) {
    case "CREATE":
      return { ...state, posts: [...state.posts, action.payload] };
    default:
      return state;
  }
};
