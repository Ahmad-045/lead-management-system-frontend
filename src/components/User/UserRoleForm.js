import React, { Fragment, useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import Spinner from '../../UI/Spinner';

import { assignRolesToUser } from '../../api/user-requests';
import { AVAL_ROLES } from '../../data/data-mapping';

const animatedComponents = makeAnimated();

const UserRoleForm = (props) => {
  const [newroles, setNewroles] = useState([]);
  const [spinnerShow, setSpinnerShow] = useState(false);

  const submitFormHandler = async (e) => {
    e.preventDefault();
    setSpinnerShow(true);

    const response = await assignRolesToUser(props.currentUser.id, newroles);
    if (response?.status === 200) {
      const changedUserIndex = props.usersList.findIndex(
        (obj) => obj.id === props.currentUser.id
      );
      const newlist = props.usersList;
      newlist[changedUserIndex] = response.data;
      props.setUsersList(newlist);
    }
    props.setModalShow(false);
    setSpinnerShow(false);
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
          {console.log(props.userRole)}
          <Select
            defaultValue={props.userRole}
            options={AVAL_ROLES}
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
