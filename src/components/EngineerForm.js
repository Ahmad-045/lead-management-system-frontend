import React, { useState, useEffect, Fragment } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import Spinner from '../UI/Spinner';

import { extractUserWithRoleForForm } from '../api/user-requests';
import { assignEnginnersApiRequest } from '../api/phase-requests';
import { matchUserToSelectFields } from '../api/helper-functions';

const animatedComponents = makeAnimated();

const EngineerForm = (props) => {
  const [engineers, setEngineers] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [spinnerShow, setSpinnerShow] = useState(true);

  useEffect(() => {
    const extractEngineersHandler = async () => {
      const response = await extractUserWithRoleForForm('engineer');
      if (response.status === 200) {
        setEngineers(matchUserToSelectFields(response.data));
      }
      setSpinnerShow(false);
    };
    extractEngineersHandler();
  }, []);

  const submitFormHandler = async (e) => {
    e.preventDefault();

    setSpinnerShow(true);
    let engIds = selectedOptions.map((eng) => eng.value);
    const response = await assignEnginnersApiRequest(engIds, props.phaseid);
    console.log(response);
    if (response.status === 200) {
      setSpinnerShow(false);
      props.hideModal(false);
    }
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
