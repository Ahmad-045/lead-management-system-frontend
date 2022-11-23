import React from 'react';

const UserContext = React.createContext({
  authToken: '',
  user: {},
  clearUserData: () => {},
  setAuthToken: () => {},
  setUser: () => {},
});

export default UserContext;
