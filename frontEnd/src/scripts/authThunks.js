  export const login = (password) => async (dispatch) => {
    try {
      // Make an API request or perform password verification here
      // If the password is correct, dispatch the loginSuccess action
      if (password === 'correct_password') {
        dispatch(loginSuccess());
      } else {
        // Handle incorrect password case
      }
    } catch (error) {
      // Handle any errors that occur during the authentication process
    }
  };