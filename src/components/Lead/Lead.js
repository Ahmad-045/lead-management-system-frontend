import React, { useEffect, useState } from 'react';
import { getAllTheLeadsFromApi } from '../../api/api-requests';
import LeadDetails from './LeadDetails';
import LeadLists from './LeadLists';
import Modal from '../../UI/Modal';
import LeadForm from './LeadForm';

const Lead = (props) => {
  const [leadsList, setLeadsList] = useState([]);
  const [singleleadData, setSingleleadData] = useState(null);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    getAllTheLeadsFromApi(setLeadsList, props.authToken);
  }, [props.authToken]);

  const showLeadDetailsHandler = (lead) => {
    setSingleleadData(lead);
    setModalShow(true);
  };

  const createNewLead = () => {
    setSingleleadData(null);
    setModalShow(true);
  };
  console.log(props.currentUser);
  return (
    <div className="mt-3">
      <h1 className="text-lg font-medium">Leads Available</h1>
      <button
        className="bg-blue-600 text-white font-medium px-2 py-1 rounded-md my-2"
        type="button"
        onClick={createNewLead}
      >
        Create New Lead
      </button>
      <LeadLists
        leadslist={leadsList}
        showLeadDetails={showLeadDetailsHandler}
        setLeadsList={setLeadsList}
      />

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
