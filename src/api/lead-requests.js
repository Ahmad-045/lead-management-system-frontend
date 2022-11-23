import axios from 'axios';
import { setauthToken, checkUnauthoriztionaStatus } from './helper-functions';
import { BASE_URL, messages } from '../data/constants';

export const getAllTheLeadsFromApi = async () => {
  setauthToken();

  const response = await axios
    .get(`${BASE_URL}/leads`)
    .catch((error) => console.log(error));

  if (response.data.user !== null) {
    return response;
  }
};

export const createNewLead = async (formData) => {
  setauthToken();

  const response = await axios
    .post(`${BASE_URL}/leads`, formData)
    .catch((error) => console.log(error));

  if (!checkUnauthoriztionaStatus(response.data.status)) {
    return response;
  }
};

export const leadToProjectConvesion = async (data) => {
  setauthToken();

  const response = await axios
    .post(`${BASE_URL}/projects`, data)
    .catch((error) => console.log(error));

  if (!checkUnauthoriztionaStatus(response.data.status)) {
    alert(messages.lead.success_updation);
    return response;
  }
};

export const deleteLeadRequest = async (leadId, leadslist, setLeadsList) => {
  setauthToken();

  const response = await axios
    .delete(`${BASE_URL}/leads/${leadId}`)
    .catch((error) => console.log(error));

  if (!checkUnauthoriztionaStatus(response.data.status)) {
    return response;
  }
};
