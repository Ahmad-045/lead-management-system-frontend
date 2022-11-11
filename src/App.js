import { useEffect, useState } from 'react';
import MemberPage from './pages/MemberPage';
import GuestPage from './pages/GuestPage';
import Navigation from './components/Navigation';
import { useNavigate } from 'react-router-dom';

import { logoutRequest } from './api/api-requests';

function App() {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [authToken, setAuthToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const extractDataFromLocalStorage = () => {
      if (localStorage.getItem('user') !== null) {
        setUser(JSON.parse(localStorage.getItem('user')));
        setAuthToken(localStorage.getItem('auth_token'));
        setLoggedIn(true);
      }
    };
    extractDataFromLocalStorage();
  }, []);

  const loginUserHandler = (responseFromApiRequest) => {
    setUser(responseFromApiRequest.data.user);
    setAuthToken(responseFromApiRequest.headers.authorization);

    responseFromApiRequest.data.user !== null
      ? setLoggedIn(true)
      : setLoggedIn(false);
  };

  const logoutUserHandler = () => {
    logoutRequest(authToken);
    setAuthToken(null);
    setUser(null);
    setLoggedIn(false);
    navigate('/');
  };

  return (
    <div className="">
      <nav>
        <Navigation
          loggedIn={loggedIn}
          logoutHander={logoutUserHandler}
          currentUser={user}
        />
      </nav>
      {loggedIn && <MemberPage currentUser={user} authToken={authToken} />}
      {!loggedIn && <GuestPage setUserHandler={loginUserHandler} />}
    </div>
  );
}

export default App;
