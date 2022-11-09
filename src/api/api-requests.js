import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export const loginRequest = async (email, password, setUserHandler) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  let data = {
    user: {
      email: email,
      password: password,
    },
  };

  axios
    .post(`${BASE_URL}/users/sign_in`, data)
    .then((response) => {
      setUserHandler(response);
      localStorage.setItem('auth_token', response.headers.authorization);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      axios.defaults.headers.common['Authorization'] =
        response.headers.authorization;
    })
    .catch((error) => {
      alert('Unauthorized error!. Try Again!');
      console.log(error);
    });
};

export const logoutRequest = async (authToken) => {
  const config = {
    header: {
      authorization: authToken,
    },
  };

  axios
    .delete(`${BASE_URL}/users/sign_out`, config)
    .then(() => alert('Successfully Logged out'))
    .catch((error) => console.log(error));

  axios.defaults.headers.common['Authorization'] = null;
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user');
};

export const getAllTheLeadsFromApi = async (setLeadsList) => {
  axios
    .get(`${BASE_URL}/leads`)
    .then((response) => {
      setLeadsList(response.data);
    })
    .catch((error) => console.log(error));
};

export const createNewLead = async (
  formData,
  user,
  setModalShow,
  setLeadsList
) => {
  const data = {
    ...formData,
    user_id: user.id,
    test_type: parseInt(formData.test_type),
  };

  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  axios
    .post(`${BASE_URL}/leads`, data)
    .then(() => {
      alert('Successfull Created the New Lead');
      setModalShow(false);
      getAllTheLeadsFromApi(setLeadsList);
    })
    .catch((error) => console.log(error));
};

export const extractPhasesOfLead = async (lead_id, setPhases) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  axios
    .get(`${BASE_URL}/leads/${lead_id}`)
    .then((res) => {
      setPhases(res.data);
    })
    .catch((error) => console.log(error));
};

export const extractManagersForForm = async (setManagers) => {
  axios
    .get(`${BASE_URL}/get_managers`)
    .then((res) => setManagers(matchManagerToSelectFields(res.data)))
    .catch((eror) => console.log(eror));
};

export const createNewPhase = async (formData, lead_id) => {
  const data = {
    ...formData,
    lead_id: parseInt(lead_id),
  };
  console.log(data);
  axios
    .post(`${BASE_URL}/phases`, data)
    .then((res) => {
      console.log(res);
      window.location.reload(true);
    })
    .catch((error) => console.log(error));
};

const matchManagerToSelectFields = (data) => {
  const newOptions = data.map((options) => ({
    value: options.id,
    label: options.email,
  }));
  return newOptions;
};
