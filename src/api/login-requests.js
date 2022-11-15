import axios from 'axios';
import { BASE_URL, messages } from '../data/constants';

export const loginRequest = async (
  email,
  password,
  setUserHandler,
  setSpinnerShow
) => {
  let data = {
    user: {
      email: email,
      password: password,
    },
  };
  setSpinnerShow(true);
  axios
    .post(`${BASE_URL}/users/sign_in`, data)
    .then((response) => {
      console.log(response);
      if (response.data.status === 'unauthorized') {
        alert(messages.incorrect_credentails);
        setSpinnerShow(false);
        return;
      }

      if (response.data.user !== null) {
        setUserHandler(response);
        localStorage.setItem('auth_token', response.headers.authorization);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        axios.defaults.headers.common['Authorization'] =
          response.headers.authorization;
        setSpinnerShow(false);
      } else {
        axios.defaults.headers.common['Authorization'] = null;
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
      }
    })
    .catch((error) => {
      console.log(error);
      setSpinnerShow(false);
    });
};

export const logoutRequest = async (
  authToken,
  setAuthToken,
  setUser,
  setLoggedIn
) => {
  const config = {
    header: {
      authorization: authToken,
    },
  };

  axios
    .delete(`${BASE_URL}/users/sign_out`, config)
    .then(() => {
      setAuthToken(null);
      setUser(null);
      setLoggedIn(false);
      alert(messages.success_logout);
      axios.defaults.headers.common['Authorization'] = null;
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
    })
    .catch((error) => console.log(error));
};

export const registerNewUserApiRequest = (
  formData,
  setErrors,
  setNewUser,
  setSpinnerShow
) => {
  setSpinnerShow(true);
  axios
    .post(`${BASE_URL}/users`, { user: formData })
    .then(() => {
      alert(messages.success_signup);
      setNewUser(false);
      setSpinnerShow(false);
    })
    .catch((error) => {
      setErrors(error.response.data.error);
      alert(error.response.data.message);
      setSpinnerShow(false);
    });
};
