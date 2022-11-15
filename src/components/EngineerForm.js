import React, { useState, useEffect, Fragment } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import Spinner from '../UI/Spinner';

import { extractEngineersForForm } from '../api/user-requests';
import { assignEnginnersApiRequest } from '../api/phase-requests';

const animatedComponents = makeAnimated();

const EngineerForm = (props) => {
  const [engineers, setEngineers] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [spinnerShow, setSpinnerShow] = useState(true);

  useEffect(() => {
    extractEngineersForForm(setEngineers, setSpinnerShow);
  }, []);

  const submitFormHandler = (e) => {
    e.preventDefault();
    setSpinnerShow(true);
    let engIds = selectedOptions.map((eng) => eng.value);
    assignEnginnersApiRequest(
      engIds,
      props.phaseid,
      setSpinnerShow,
      props.hideModal
    );
  };

  return (
    <Fragment>
      {spinnerShow ? (
        <Spinner />
      ) : (
        <form onSubmit={submitFormHandler}>
          <h1 className="mb-5 font-medium underline text-xl">
            All Available Engineers in the Company
          </h1>
          {engineers && (
            <Select
              options={engineers}
              components={animatedComponents}
              isMulti
              closeMenuOnSelect={true}
              onChange={setSelectedOptions}
            />
          )}
          <button
            type="submit"
            className="float-right my-5 mr-5 bg-blue-600 text-white px-3 py-1 rounded-md"
          >
            Add Engineers
          </button>
        </form>
      )}
    </Fragment>
  );
};

export default EngineerForm;
