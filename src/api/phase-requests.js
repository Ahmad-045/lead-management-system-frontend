import axios from 'axios';
import { setauthToken, checkUnauthoriztionaStatus } from './helper-functions';
import { BASE_URL, messages } from '../data/constants';

export const extractPhasesOfLead = async (lead_id) => {
  setauthToken();

  const response = await axios
    .get(`${BASE_URL}/leads/${lead_id}`)
    .catch((error) => console.log(error));

  return response;
};

export const createNewPhase = async (formData) => {
  setauthToken();

  const respone = await axios
    .post(`${BASE_URL}/phases`, formData)
    .catch((error) => console.log(error));
  return respone;
};

export const phaseStatusApiRequest = async (phaseId, newValue) => {
  setauthToken();

  const response = await axios
    .patch(`${BASE_URL}/phases/${phaseId}`, { status: newValue })
    .catch((error) => console.log(error));

  if (!checkUnauthoriztionaStatus(response.data.status)) {
    alert(messages.phase.success_update_status);
    return response;
  }
};

export const deletePhaseRequest = async (phaseId, phaselist, setPhases) => {
  setauthToken();

  const response = await axios
    .delete(`${BASE_URL}/phases/${phaseId}`)
    .catch((error) => console.log(error));

  if (!checkUnauthoriztionaStatus(response.data.status)) {
    return response;
  }
};

export const assignEnginnersApiRequest = async (engIds, id) => {
  setauthToken();

  const response = await axios
    .post(`${BASE_URL}/assign_engineer`, { data: { engIds, id } })
    .catch((error) => console.log(error));

  if (!checkUnauthoriztionaStatus(response.data.status)) {
    alert(messages.phase.success_added_eng);
    return response;
  }
};

export const extractEngineersOfPhase = async (phaseId) => {
  setauthToken();
  const response = await axios
    .get(`${BASE_URL}/get_engineer_users/${phaseId}`)
    .catch((error) => console.log(error));

  return response;
};
