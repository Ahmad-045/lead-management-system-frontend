import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { extractManagersForForm, createNewPhase } from '../../api/api-requests';
import Select from 'react-select';
import Spinner from '../../UI/Spinner';

import 'react-datepicker/dist/react-datepicker.css';

const defaultFormState = {
  phase_name: '',
  start_date: '',
  end_date: '',
  manager_id: '',
};

const PhaseForm = (props) => {
  const [formData, setFormData] = useState(defaultFormState);
  const [managers, setManagers] = useState([]);
  const [spinnerShow, setSpinnerShow] = useState(true);

  useEffect(() => {
    extractManagersForForm(setManagers, setSpinnerShow);
  }, []);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    setSpinnerShow(true);

    const isEmpty = Object.values(formData).every((x) => x !== '');

    if (!isEmpty) {
      alert('Fill in all the required Fields...');
      return;
    }

    createNewPhase(
      formData,
      props.leadId,
      props.setModalShow,
      props.setPhases,
      props.id,
      setSpinnerShow
    );
  };

  const inputFieldChangeHandler = (e) => {
    const updatedState = {
      ...formData,
      [e.target.name]: e.target.value,
    };
    setFormData(updatedState);
  };

  const setDateHandler = (stateField, date) => {
    setFormData({
      ...formData,
      [stateField]: date,
    });
  };

  const setManager = (manager) => {
    setFormData({
      ...formData,
      manager_id: manager.value,
    });
  };

  return (
    <div className="p-5">
      {spinnerShow ? (
        <Spinner />
      ) : (
        <div>
          <h1 className="mb-4 font-medium text-xl underline">
            Create New Phase
          </h1>
          <form className="w-full max-w-lg" onSubmit={formSubmitHandler}>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-last-name"
                >
                  Start Date
                </label>
                <DatePicker
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  selected={formData.start_date}
                  onChange={(date) => setDateHandler('start_date', date)}
                  minDate={new Date()}
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-last-name"
                >
                  End Date
                </label>
                <DatePicker
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  selected={formData.end_date}
                  onChange={(date) => setDateHandler('end_date', date)}
                  minDate={formData.start_date}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Phase Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-password"
                  type="text"
                  name="phase_name"
                  onChange={inputFieldChangeHandler}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Manager
                </label>
                <Select options={managers} onChange={setManager} />
              </div>
            </div>
            <button
              className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-500 ease-in-out duration-100"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PhaseForm;
