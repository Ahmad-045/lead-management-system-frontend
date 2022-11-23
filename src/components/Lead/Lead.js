import React, { useContext, useEffect, useState } from 'react';

import LeadDetails from './LeadDetails';
import LeadLists from './LeadLists';
import Modal from '../../UI/Modal';
import LeadForm from './LeadForm';
import Spinner from '../../UI/Spinner';

import { getAllTheLeadsFromApi } from '../../api/lead-requests';
import UserContext from '../../store/user-context';

const Lead = (props) => {
  const userCtx = useContext(UserContext);

  const [leadsList, setLeadsList] = useState([]);
  const [singleleadData, setSingleleadData] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [spinnerShow, setSpinnerShow] = useState(true);
  const userRoles = [...userCtx.user.roles.map((x) => x.name)];

  useEffect(() => {
    const getLeadData = async () => {
      const respone = await getAllTheLeadsFromApi();
      setLeadsList(respone.data);
      setSpinnerShow(false);
    };
    getLeadData();
  }, []);

  const showLeadDetailsHandler = (lead) => {
    setSingleleadData(lead);
    setModalShow(true);
  };

  const createNewLead = () => {
    setSingleleadData(null);
    setModalShow(true);
  };

  let buttonData = '';
  if (userRoles.includes('admin') || userRoles.includes('bd')) {
    buttonData = (
      <button
        className="bg-blue-600 text-white font-medium px-2 py-1 rounded-md my-2"
        type="button"
        onClick={createNewLead}
      >
        Create New Lead
      </button>
    );
  }

  return (
    <div className="mt-3">
      <h1 className="text-lg font-medium">Leads Available</h1>
      {buttonData}
      {spinnerShow ? (
        <Spinner />
      ) : (
        <LeadLists
          leadslist={leadsList}
          showLeadDetails={showLeadDetailsHandler}
          setLeadsList={setLeadsList}
          setSpinnerShow={setSpinnerShow}
        />
      )}

      {modalShow && (
        <Modal onhideDetails={() => setModalShow(false)}>
          {singleleadData && <LeadDetails singleleadData={singleleadData} />}
          {!singleleadData && (
            <LeadForm setModalShow={setModalShow} setLeadsList={setLeadsList} />
          )}
        </Modal>
      )}
    </div>
  );
};

export default Lead;
