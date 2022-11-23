import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Modal from '../../UI/Modal';
import PhaseList from './PhaseList';
import PhaseManagerDetail from './PhaseManagerDetail';
import PhaseForm from './PhaseForm';
import Spinner from '../../UI/Spinner';

import { extractPhasesOfLead } from '../../api/phase-requests';
import UserContext from '../../store/user-context';

const Phase = (props) => {
  const userCtx = useContext(UserContext);

  const { id } = useParams();

  const [phases, setPhases] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [manager, setManager] = useState(null);
  const [spinnerShow, setSpinnerShow] = useState(true);

  const userRoles = [...userCtx.user.roles.map((x) => x.name)];

  const showPhaseManagerDetails = (phase) => {
    setManager(phase.manager);
    setModalShow(true);
  };

  const createNewPhase = () => {
    setManager(null);
    setModalShow(true);
  };

  useEffect(() => {
    const extractPhasesOfLeadHandler = async () => {
      const response = await extractPhasesOfLead(id);
      if (response?.status === 200) {
        setPhases(response.data);
        setSpinnerShow(false);
      } else {
        alert('Something went wrong.!!, kindly check the error logs');
        setSpinnerShow(false);
      }
    };
    extractPhasesOfLeadHandler();
  }, [id, props.authToken]);

  let buttonData = '';
  if (userRoles.includes('admin') || userRoles.includes('bd')) {
    buttonData = (
      <button
        className="bg-blue-600 text-white font-medium px-2 py-1 rounded-md my-2"
        type="button"
        onClick={createNewPhase}
      >
        Create New Phase
      </button>
    );
  }

  return (
    <div className="mt-3">
      <h1 className="text-lg font-medium">Phases Of this Lead</h1>
      {buttonData}
      {spinnerShow ? (
        <Spinner />
      ) : (
        <PhaseList
          phaselist={phases}
          showManagerDetails={showPhaseManagerDetails}
          setPhases={setPhases}
          id={id}
        />
      )}

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
