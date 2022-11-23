import axios from 'axios';
import { BASE_URL, messages } from '../data/constants';

export const loginRequest = async (data) => {
  const response = await axios
    .post(`${BASE_URL}/users/sign_in`, data)
    .catch((error) => console.log(error));

  if (response.data.status === 'unauthorized') {
    alert(messages.incorrect_credentails);
    return false;
  }
  axios.defaults.headers.common['Authorization'] =
    response.headers.authorization;

  return response;
};

export const logoutRequest = async (authToken) => {
  const config = {
    header: {
      authorization: authToken,
    },
  };

  const response = await axios
    .delete(`${BASE_URL}/users/sign_out`, config)
    .catch((error) => console.log(error));

  if (response?.status === 200) {
    alert(messages.success_logout);
    axios.defaults.headers.common['Authorization'] = null;
    return response;
  }
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
