import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { extractEngineersOfPhase } from '../api/api-requests';

const PhaseEnginners = () => {
  const { phaseId } = useParams();
  const [engineers, setEngineers] = useState([]);

  useEffect(() => {
    extractEngineersOfPhase(phaseId, setEngineers);
  }, []);

  const engineersData = (
    <div>
      {engineers.map((e, i) => (
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
      ))}
    </div>
  );

  return (
    <div>
      <h1 className="bg-gray-600 inline-block text-white font-medium px-3 py-1 rounded-md my-3">
        Engineers working on this Phase
      </h1>
      {engineers && engineersData}
      {engineers.length === 0 && (
        <p className="text-center my-5 font-medium text-2xl">
          Right Now., No Engineers are Working on this Phase
        </p>
      )}
    </div>
  );
};

export default PhaseEnginners;
