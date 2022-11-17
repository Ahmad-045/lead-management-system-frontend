import axios from 'axios';
import {
  setauthToken,
  matchUserToSelectFields,
  checkUnauthoriztionaStatus,
} from './helper-functions';
import { BASE_URL, messages } from '../data/constants';

// export const extractManagersForForm = async (setManagers, setSpinnerShow) => {
//   setauthToken();
//   axios
//     .get(`${BASE_URL}/get_managers`)
//     .then((res) => {
//       setManagers(matchUserToSelectFields(res.data));
//       setSpinnerShow(false);
//     })
//     .catch((eror) => {
//       console.log(eror);
//       setSpinnerShow(false);
//     });
// };

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

export const extractUserWithRoleForForm = async (
  role,
  setUsersWithRole,
  setSpinnerShow
) => {
  setauthToken();
  axios
    .get(`${BASE_URL}/user_with_role?role=${role}`)
    .then((res) => {
      console.log(res);
      setUsersWithRole(matchUserToSelectFields(res.data));
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

export const assignRolesToUser = (
  currentUser,
  newroles,
  setUsersList,
  setModalShow,
  setSpinnerShow
) => {
  let rolesValue = [];
  newroles.map((role) => rolesValue.push(role.value));
  setauthToken();
  axios
    .patch(`${BASE_URL}/users/${currentUser}`, { data: rolesValue })
    .then((res) => {
      alert(messages.user.success_updated_role);
      extractUsersFromApi(setUsersList, setSpinnerShow);
      setModalShow(false);
      setSpinnerShow(false);
    })
    .catch((error) => console.log(error));
};

export const extractUserRoles = (user) => {
  setauthToken();
  axios
    .get(`${BASE_URL}/users`)
    .then((res) => {
      if (checkUnauthoriztionaStatus(res.data.status)) {
        return;
      }
    })
    .catch((error) => {});
};

export const deleteUserRequest = async (userId, usersList, setUsersList) => {
  setauthToken();
  axios
    .delete(`${BASE_URL}/users/${userId}`)
    .then((res) => {
      if (checkUnauthoriztionaStatus(res.data.status)) {
        return;
      }
      setUsersList(usersList.filter((obj) => obj.id !== userId));
    })
    .catch((error) => console.log(error));
};

// moiz@gamil.com
