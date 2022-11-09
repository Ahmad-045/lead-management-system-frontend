import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { extractPhasesOfLead } from '../../api/api-requests';
import PhaseList from './PhaseList';
import Modal from '../../UI/Modal';
import PhaseManagerDetail from './PhaseManagerDetail';
import PhaseForm from './PhaseForm';

const Phase = (props) => {
  const { id } = useParams();
  const [phases, setPhases] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [manager, setManager] = useState(null);

  const showPhaseManagerDetails = (phase) => {
    setManager(phase.manager);
    setModalShow(true);
  };

  const createNewPhase = (phase) => {
    setManager(null);
    setModalShow(true);
  };

  useEffect(() => {
    extractPhasesOfLead(id, setPhases);
  }, [id]);

  return (
    <div>
      <button
        className="bg-blue-600 text-white font-medium px-2 py-1 rounded-md my-2"
        type="button"
        onClick={createNewPhase}
      >
        Create New Phase
      </button>
      <PhaseList
        phaselist={phases}
        showManagerDetails={showPhaseManagerDetails}
      />

      {modalShow && (
        <Modal onhideDetails={() => setModalShow(false)}>
          {manager && <PhaseManagerDetail phaseManager={manager} />}
          {!manager && (
            <PhaseForm
              setModalShow={setModalShow}
              setPhases={setPhases}
              leadId={id}
            />
          )}
        </Modal>
      )}
    </div>
  );
};

export default Phase;
