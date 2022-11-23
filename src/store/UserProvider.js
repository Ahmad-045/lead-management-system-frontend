import { useState } from 'react';
import UserContext from './user-context';

const UserProvider = (props) => {
  const [authToken, setAuthToken] = useState('');
  const [user, setUser] = useState({});
  // const [loggedIn, setLoggedIn] = useState(false);

  const removeDetaHandler = () => {};

  const userContext = {
    authToken: authToken,
    user: user,
    clearUserData: removeDetaHandler,
    setAuthToken: setAuthToken,
    setUser: setUser,
  };

  return (
    <UserContext.Provider value={userContext}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
