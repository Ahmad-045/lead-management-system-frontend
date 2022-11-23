import { Fragment, useContext, useEffect, useState } from 'react';
import MemberPage from './pages/MemberPage';
import GuestPage from './pages/GuestPage';
import Navigation from './components/Navigation';
import { useNavigate } from 'react-router-dom';

import UserContext from './store/user-context';

import { logoutRequest } from './api/login-requests';
import Spinner from './UI/Spinner';
import CurrentUser from './components/CurrentUser';

function App() {
  const navigate = useNavigate();
  const userCtx = useContext(UserContext);

  const [spinnerShow, setSpinnerShow] = useState(false);

  useEffect(() => {
    const extractDataFromLocalStorage = () => {
      if (
        localStorage.getItem('user') !== null &&
        localStorage.getItem('user') !== 'undefined'
      ) {
        userCtx.setUser(JSON.parse(localStorage.getItem('user')));
        userCtx.setAuthToken(localStorage.getItem('auth_token'));
      }
    };
    extractDataFromLocalStorage();
  }, []);

  const logoutUserHandler = async () => {
    const response = await logoutRequest(userCtx.authToken);
    if (response?.status === 200) {
      userCtx.setAuthToken('');
      userCtx.setUser(null);
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      navigate('/');
    }
  };

  return (
    <Fragment>
      <nav>
        <Navigation logoutHander={logoutUserHandler} />
      </nav>
      <div className="p-5">
        {userCtx.authToken.length !== 0 && (
          <>
            <CurrentUser currentUser={userCtx.user} />
            <MemberPage currentUser={userCtx.user} />
          </>
        )}
        {spinnerShow ? (
          <Spinner />
        ) : (
          userCtx.authToken.length === 0 && (
            <GuestPage setSpinnerShow={setSpinnerShow} />
          )
        )}
      </div>
    </Fragment>
  );
}

export default App;
