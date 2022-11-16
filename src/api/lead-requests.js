import axios from 'axios';
import { setauthToken, checkUnauthoriztionaStatus } from './helper-functions';
import { BASE_URL, messages } from '../data/constants';

export const getAllTheLeadsFromApi = async (setLeadsList, setSpinnerShow) => {
  setauthToken();
  axios
    .get(`${BASE_URL}/leads`)
    .then((response) => {
      if (response.data.user !== null) {
        setLeadsList(response.data);
        setSpinnerShow(false);
      }
    })
    .catch((error) => {
      console.log(error);
      setSpinnerShow(false);
    });
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

      alert(messages.lead.success_creation);
      setSpinnerShow(false);
      setModalShow(false);
      getAllTheLeadsFromApi(setLeadsList);
    })
    .catch((error) => {
      console.log(error);
      setSpinnerShow(false);
    });
};

export const leadToProjectConvesion = (leadId, setLeadsList) => {
  setauthToken();
  const data = {
    lead_id: leadId,
    conversion_date: new Date(),
  };

  axios
    .post(`${BASE_URL}/projects`, data)
    .then((res) => {
      if (!checkUnauthoriztionaStatus(res.data.status)) {
        alert(messages.lead.success_updation);
        getAllTheLeadsFromApi(setLeadsList);
      }
    })
    .catch((error) => console.log(error));
};

export const deleteLeadRequest = (leadId, leadslist, setLeadsList) => {
  setauthToken();
  axios
    .delete(`${BASE_URL}/leads/${leadId}`)
    .then((res) => {
      if (!checkUnauthoriztionaStatus(res.data.status)) {
        setLeadsList(leadslist.filter((obj) => obj.id !== leadId));
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
