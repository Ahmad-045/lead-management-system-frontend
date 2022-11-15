import axios from 'axios';

export const setauthToken = () => {
  if (
    axios.defaults.headers.common['Authorization'] === null ||
    axios.defaults.headers.common['Authorization'] === undefined
  ) {
    axios.defaults.headers.common['Authorization'] =
      localStorage.getItem('auth_token');
  }
};

export const checkUnauthoriztionaStatus = (status) => {
  if (status === 'unauthorized') {
    alert('Not Authorized to Perform this action!');
    return true;
  }
  return false;
};

export const matchUserToSelectFields = (data) => {
  const newOptions = data.map((options) => ({
    value: options.id,
    label: options.email,
  }));
  return newOptions;
};
