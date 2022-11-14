import React, { Fragment, useState } from 'react';
import { assignRolesToUser } from '../../api/api-requests';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Spinner from '../../UI/Spinner';

const animatedComponents = makeAnimated();

const UserRoleForm = (props) => {
  const [newroles, setNewroles] = useState([]);
  const [spinnerShow, setSpinnerShow] = useState(false);

  const availableRoles = [
    { value: 'admin', label: 'Admin' },
    { value: 'manager', label: 'Manager' },
    { value: 'engineer', label: 'Engineer' },
    { value: 'bd', label: 'Business Developer' },
  ];

  const submitFormHandler = (e) => {
    e.preventDefault();
    setSpinnerShow(true);

    assignRolesToUser(
      props.currentUser.id,
      newroles,
      props.setUsersList,
      props.setModalShow,
      setSpinnerShow
    );
  };

  return (
    <Fragment>
      {spinnerShow ? (
        <Spinner />
      ) : (
        <form onSubmit={submitFormHandler}>
          <h1 className="mb-5 font-medium underline text-xl">
            Available Roles in the Company
          </h1>
          <Select
            options={availableRoles}
            components={animatedComponents}
            isMulti
            closeMenuOnSelect={true}
            onChange={setNewroles}
          />
          <button
            type="submit"
            className="float-right my-5 mr-5 bg-blue-600 text-white px-3 py-1 rounded-md"
          >
            Update Roles
          </button>
        </form>
      )}
    </Fragment>
  );
};

export default UserRoleForm;
