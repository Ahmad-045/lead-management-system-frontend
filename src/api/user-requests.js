import axios from 'axios';
import { setauthToken, checkUnauthoriztionaStatus } from './helper-functions';
import { BASE_URL, messages } from '../data/constants';

export const extractUserWithRoleForForm = async (role) => {
  setauthToken();
  const response = axios
    .get(`${BASE_URL}/user_with_role?role=${role}`)
    .catch((error) => console.log(error));

  return response;
};

export const extractUsersFromApi = async () => {
  setauthToken();

  const response = await axios
    .get(`${BASE_URL}/users`)
    .catch((error) => console.log(error));

  if (!checkUnauthoriztionaStatus(response.data.status)) {
    return response;
  }
};

export const assignRolesToUser = async (currentUser, newroles) => {
  let rolesValue = [];
  newroles.map((role) => rolesValue.push(role.value));
  setauthToken();
  const response = await axios
    .patch(`${BASE_URL}/users/${currentUser}`, { data: rolesValue })
    .catch((error) => console.log(error));

  alert(messages.user.success_updated_role);
  return response;
};

export const deleteUserRequest = async (userId) => {
  setauthToken();

  const response = await axios
    .delete(`${BASE_URL}/users/${userId}`)
    .catch((error) => console.log(error));

  if (!checkUnauthoriztionaStatus(response.data.status)) {
    return response;
  }
};
