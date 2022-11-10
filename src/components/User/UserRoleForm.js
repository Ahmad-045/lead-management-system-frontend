import React, { useState } from 'react';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

const UserRoleForm = (props) => {
  const [newroles, setNewroles] = useState([]);
  const availableRoles = [
    { value: 'admin', label: 'Admin' },
    { value: 'manager', label: 'Manager' },
    { value: 'engineer', label: 'Engineer' },
    { value: 'bd', label: 'Business Developer' },
  ];

  const submitFormHandler = (e) => {
    e.preventDefault();
    console.log(newroles);
    props.setModalShow(false);
  };

  return (
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
        Add Engineers
      </button>
    </form>
  );
};

export default UserRoleForm;
