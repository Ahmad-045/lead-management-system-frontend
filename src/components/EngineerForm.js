import React, { useState, useEffect } from 'react';
import {
  extractEngineersForForm,
  assignEnginnersApiRequest,
} from '../api/api-requests';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

const EngineerForm = (props) => {
  const [engineers, setEngineers] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    extractEngineersForForm(setEngineers);
  }, []);

  const submitFormHandler = (e) => {
    e.preventDefault();
    let engIds = selectedOptions.map((eng) => eng.value);
    assignEnginnersApiRequest(engIds, props.phaseid);
    props.hideModal(false);
  };

  return (
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
  );
};

export default EngineerForm;
