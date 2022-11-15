import axios from 'axios';
import { setauthToken, checkUnauthoriztionaStatus } from './helper-functions';
import { BASE_URL, messages } from '../data/constants';

export const extractPhasesOfLead = async (
  lead_id,
  setPhases,
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
      extractPhasesOfLead(lead_id, setPhases, setSpinnerShow);
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
      console.log(res);
      setSpinnerShow(false);
      alert(messages.phase.success_update_status);
    })
    .catch((error) => {
      console.log(error);
      setSpinnerShow(false);
    });
};

export const deletePhaseRequest = (phaseId, phaselist, setPhases) => {
  setauthToken();
  axios
    .delete(`${BASE_URL}/phases/${phaseId}`)
    .then((res) => {
      setPhases(phaselist.filter((obj) => obj.id !== phaseId));
    })
    .catch((error) => {
      console.log(error);
      return false;
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
      if (checkUnauthoriztionaStatus(res.data.status)) {
        setSpinnerShow(false);
        return;
      }
      setSpinnerShow(false);
      hideModal(false);
      alert(messages.phase.success_added_eng);
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
