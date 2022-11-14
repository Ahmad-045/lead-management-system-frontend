import axios from 'axios';

const BASE_URL = 'https://glacial-ravine-73785.herokuapp.com';
// const BASE_URL = 'http://localhost:3000';
let AUTH_TOKEN = '';

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
      if (response.data.user !== null) {
        setUserHandler(response);
        localStorage.setItem('auth_token', response.headers.authorization);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        axios.defaults.headers.common['Authorization'] =
          response.headers.authorization;
        AUTH_TOKEN = response.headers.authorization;
        setSpinnerShow(false);
      } else {
        alert('Unauthorized error!. Try Again!');
        setSpinnerShow(false);
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
    })
    .catch((error) => console.log(error));

  alert('Successfully Logged out');
  axios.defaults.headers.common['Authorization'] = null;
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user');
};

export const getAllTheLeadsFromApi = async (
  setLeadsList,
  authToken,
  setSpinnerShow
) => {
  setauthToken();
  axios
    .get(`${BASE_URL}/leads`)
    .then((response) => {
      if (response.data.user !== null) {
        setLeadsList(response.data);
        setSpinnerShow(false);
      } else {
        alert('Login Again!!');
        logoutRequest(authToken);
      }
    })
    .catch((error) => console.log(error));
};

export const createNewLead = async (
  formData,
  user,
  setModalShow,
  setLeadsList,
  setSpinnerShow
) => {
  setSpinnerShow(true);
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
        setSpinnerShow(false);
        return;
      }

      alert('Successfull Created the New Lead');
      setSpinnerShow(false);
      setModalShow(false);
      getAllTheLeadsFromApi(setLeadsList);
    })
    .catch((error) => {
      console.log(error);
      setSpinnerShow(false);
    });
};

export const extractPhasesOfLead = async (
  lead_id,
  setPhases,
  authToken,
  setSpinnerShow
) => {
  setauthToken();
  axios
    .get(`${BASE_URL}/leads/${lead_id}`)
    .then((res) => {
      setPhases(res.data);
      setSpinnerShow(false);
    })
    .catch((error) => console.log(error));
};

export const extractManagersForForm = async (setManagers, setSpinnerShow) => {
  setauthToken();
  axios
    .get(`${BASE_URL}/get_managers`)
    .then((res) => {
      setManagers(matchUserToSelectFields(res.data));
      setSpinnerShow(false);
    })
    .catch((eror) => {
      console.log(eror);
      setSpinnerShow(false);
    });
};

export const extractEngineersForForm = async (setEngineers, setSpinnerShow) => {
  setauthToken();
  axios
    .get(`${BASE_URL}/get_engineers`)
    .then((res) => {
      setEngineers(matchUserToSelectFields(res.data));
      setSpinnerShow(false);
    })
    .catch((error) => {
      console.log(error);
      setSpinnerShow(false);
    });
};

export const createNewPhase = async (
  formData,
  lead_id,
  setModalShow,
  setPhases,
  setSpinnerShow
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
      setSpinnerShow(false);
    })
    .catch((error) => {
      console.log(error);
      setSpinnerShow(false);
    });
};

export const phaseStatusApiRequest = (phaseId, newValue, setSpinnerShow) => {
  setauthToken();
  axios
    .patch(`${BASE_URL}/phases/${phaseId}`, { status: newValue })
    .then((res) => {
      setSpinnerShow(false);
      alert('Successfully, Updated the Phase State');
    })
    .catch((error) => {
      console.log(error);
      setSpinnerShow(false);
    });
};

export const assignEnginnersApiRequest = (
  engIds,
  id,
  setSpinnerShow,
  hideModal
) => {
  setauthToken();
  axios
    .post(`${BASE_URL}/assign_engineer`, { data: { engIds, id } })
    .then((res) => {
      setSpinnerShow(false);
      hideModal(false);
      alert('Successfully, Added the Engineers');
    })
    .catch((error) => {
      console.log(error);
      setSpinnerShow(false);
      hideModal(false);
    });
};

export const extractEngineersOfPhase = (
  phaseId,
  setEngineers,
  setSpinnerShow
) => {
  setauthToken();
  axios
    .get(`${BASE_URL}/get_engineer_users/${phaseId}`)
    .then((res) => {
      setEngineers(res.data);
      setSpinnerShow(false);
    })
    .catch((error) => {
      console.log(error);
      setSpinnerShow(false);
    });
};

export const extractUsersFromApi = (setUsersList, setSpinnerShow) => {
  setauthToken();
  axios
    .get(`${BASE_URL}/users`)
    .then((res) => {
      if (checkUnauthoriztionaStatus(res.data.status)) {
        setSpinnerShow(false);
        return;
      }
      setUsersList(res.data);
      setSpinnerShow(false);
    })
    .catch((error) => {
      console.log(error);
      setSpinnerShow(false);
    });
};

export const assignRolesToUser = (currentUser, newroles, setUsersList) => {
  let rolesValue = [];
  newroles.map((role) => rolesValue.push(role.value));
  setauthToken();
  axios
    .patch(`${BASE_URL}/users/${currentUser}`, { data: rolesValue })
    .then((res) => {
      alert('Successfully! updated the role');
      extractUsersFromApi(setUsersList);
    })
    .catch((error) => console.log(error));
};

export const registerNewUserApiRequest = (formData, setErrors, setNewUser) => {
  axios
    .post(`${BASE_URL}/users`, { user: formData })
    .then((res) => {
      alert('Successfully registered to the System!.. Login to Continue!');
      setNewUser(false);
    })
    .catch((error) => {
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

export const leadToProjectConvesion = (leadId, setLeadsList) => {
  const data = {
    lead_id: leadId,
    conversion_date: new Date(),
  };

  axios
    .post(`${BASE_URL}/projects`, data)
    .then((res) => {
      alert('successfully! updated the Leads');
      getAllTheLeadsFromApi(setLeadsList);
    })
    .catch((error) => console.log(error));
};

const setauthToken = () => {
  if (AUTH_TOKEN.length !== 0) {
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
