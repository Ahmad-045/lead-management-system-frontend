import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { extractEngineersOfPhase } from '../api/api-requests';
import Spinner from '../UI/Spinner';

const PhaseEnginners = () => {
  const { phaseId } = useParams();
  const [engineers, setEngineers] = useState([]);
  const [spinnerShow, setSpinnerShow] = useState(true);

  useEffect(() => {
    extractEngineersOfPhase(phaseId, setEngineers, setSpinnerShow);
  }, []);

  const engineersData = (
    <div>
      {engineers.length === 0 ? (
        <p className="text-center my-5 font-medium text-2xl">
          Right Now., No Engineers are Working on this Phase
        </p>
      ) : (
        engineers.map((e, i) => (
          <div key={e + i} className="shadow-md my-3 px-3 py-4">
            <p>
              <strong>EMP ID: </strong>
              {e.id}
            </p>
            <p>
              <strong>Eamil: </strong>
              {e.email}
            </p>
          </div>
        ))
      )}
    </div>
  );

  return (
    <div>
      <h1 className="bg-gray-600 inline-block text-white font-medium px-3 py-1 rounded-md my-3">
        Engineers working on this Phase
      </h1>
      {spinnerShow ? <Spinner /> : engineersData}
    </div>
  );
};

export default PhaseEnginners;
