const initialState = {
    isLoggedIn: false,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return { isLoggedIn: true };
      case 'LOGOUT':
        return { isLoggedIn: false };
      default:
        return state;
    }
  };
  
  export default authReducer;