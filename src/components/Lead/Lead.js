import React, { useEffect, useState } from 'react';

import LeadDetails from './LeadDetails';
import LeadLists from './LeadLists';
import Modal from '../../UI/Modal';
import LeadForm from './LeadForm';
import Spinner from '../../UI/Spinner';

import { getAllTheLeadsFromApi } from '../../api/lead-requests';

const Lead = (props) => {
  const [leadsList, setLeadsList] = useState([]);
  const [singleleadData, setSingleleadData] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [spinnerShow, setSpinnerShow] = useState(true);
  const userRoles = [...props.currentUser.roles.map((x) => x.name)];

  useEffect(() => {
    getAllTheLeadsFromApi(setLeadsList, setSpinnerShow);
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
            <LeadForm
              currentUser={props.currentUser}
              setModalShow={setModalShow}
              authToken={props.authToken}
              setLeadsList={setLeadsList}
            />
          )}
        </Modal>
      )}
    </div>
  );
};

export default Lead;
