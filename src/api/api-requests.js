import axios from 'axios';

const BASE_URL = 'http://localhost:3000';
let AUTH_TOKEN = '';

export const loginRequest = async (email, password, setUserHandler) => {
  let data = {
    user: {
      email: email,
      password: password,
    },
  };

  axios
    .post(`${BASE_URL}/users/sign_in`, data)
    .then((response) => {
      if (response.data.user !== null) {
        setUserHandler(response);
        localStorage.setItem('auth_token', response.headers.authorization);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        axios.defaults.headers.common['Authorization'] =
          response.headers.authorization;
        AUTH_TOKEN = response.headers.authorization;
      } else {
        alert('Unauthorized error!. Try Again!');
      }
    })
    .catch((error) => {
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

export const getAllTheLeadsFromApi = async (setLeadsList, authToken) => {
  setauthToken();
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
  setauthToken();
  const data = {
    ...formData,
    user_id: user.id,
    test_type: parseInt(formData.test_type),
  };

  axios
    .post(`${BASE_URL}/leads`, data)
    .then((res) => {
      if (checkUnauthoriztionaStatus(res.data.status)) {
        return;
      }

      alert('Successfull Created the New Lead');
      setModalShow(false);
      getAllTheLeadsFromApi(setLeadsList);
    })
    .catch((error) => console.log(error));
};

export const extractPhasesOfLead = async (lead_id, setPhases, authToken) => {
  setauthToken();
  axios
    .get(`${BASE_URL}/leads/${lead_id}`)
    .then((res) => {
      setPhases(res.data);
    })
    .catch((error) => console.log(error));
};

export const extractManagersForForm = async (setManagers) => {
  setauthToken();
  axios
    .get(`${BASE_URL}/get_managers`)
    .then((res) => setManagers(matchUserToSelectFields(res.data)))
    .catch((eror) => console.log(eror));
};

export const extractEngineersForForm = async (setEngineers, authToken) => {
  setauthToken();
  axios
    .get(`${BASE_URL}/get_engineers`)
    .then((res) => setEngineers(matchUserToSelectFields(res.data)))
    .catch((error) => console.log(error));
};

export const createNewPhase = async (
  formData,
  lead_id,
  setModalShow,
  setPhases
) => {
  setauthToken();
  const data = {
    ...formData,
    lead_id: parseInt(lead_id),
  };
  axios
    .post(`${BASE_URL}/phases`, data)
    .then((res) => {
      setModalShow(false);
      extractPhasesOfLead(lead_id, setPhases);
    })
    .catch((error) => console.log(error));
};

export const phaseStatusApiRequest = (phaseId, newValue) => {
  setauthToken();
  axios
    .patch(`${BASE_URL}/phases/${phaseId}`, { status: newValue })
    .then((res) => console.log(res))
    .catch((error) => console.log(error));
};

export const assignEnginnersApiRequest = (engIds, id) => {
  setauthToken();
  axios
    .post(`${BASE_URL}/assign_engineer`, { data: { engIds, id } })
    .then((res) => {
      console.log(res);
      alert('Successfully, Added the Engineers');
    })
    .catch((error) => console.log(error));
};

export const extractEngineersOfPhase = (phaseId, setEngineers) => {
  setauthToken();
  axios
    .get(`${BASE_URL}/get_engineer_users/${phaseId}`)
    .then((res) => setEngineers(res.data))
    .catch((error) => console.log(error));
};

export const extractUsersFromApi = (setUsersList) => {
  setauthToken();
  axios
    .get(`${BASE_URL}/users`)
    .then((res) => {
      if (checkUnauthoriztionaStatus(res.data.status)) {
        return;
      }
      console.log(res);
      setUsersList(res.data);
    })
    .catch((error) => console.log(error));
};

export const assignRolesToUser = (currentUser, newroles, setUsersList) => {
  let rolesValue = [];
  newroles.map((role) => rolesValue.push(role.value));
  setauthToken();
  axios
    .patch(`${BASE_URL}/users/${currentUser}`, { data: rolesValue })
    .then((res) => {
      console.log(res);
      alert('Successfully! updated the role');
      extractUsersFromApi(setUsersList);
    })
    .catch((error) => console.log(error));
};

export const registerNewUserApiRequest = (formData, setErrors, setNewUser) => {
  console.log(formData);

  axios
    .post(`${BASE_URL}/users`, { user: formData })
    .then((res) => {
      alert('Successfully registered to the System!.. Login to Continue!');
      setNewUser(false);
      console.log('RES-->', res);
    })
    .catch((error) => {
      // console.log(error.response.data.error);
      setErrors(error.response.data.error);
      alert(error.response.data.message);
    });
};

const matchUserToSelectFields = (data) => {
  const newOptions = data.map((options) => ({
    value: options.id,
    label: options.email,
  }));
  return newOptions;
};

const setauthToken = () => {
  if (AUTH_TOKEN) {
    axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
  } else {
    axios.defaults.headers.common['Authorization'] =
      localStorage.getItem('auth_token');
  }
};

const checkUnauthoriztionaStatus = (status) => {
  if (status === 'unauthorized') {
    alert('Not Authorized to Perform this action!');
    return true;
  }
  return false;
};
