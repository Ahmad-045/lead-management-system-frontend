import React, { Fragment, useState, useEffect } from 'react';
import { assignRolesToUser, extractUserRoles } from '../../api/api-requests';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Spinner from '../../UI/Spinner';
import { RolesLabel, AVAL_ROLES } from '../../data/roles-data';

const animatedComponents = makeAnimated();

const UserRoleForm = (props) => {
  const [newroles, setNewroles] = useState([]);
  const [spinnerShow, setSpinnerShow] = useState(false);
  const [userRole, setUserRole] = useState([]);

  useEffect(() => {
    // const currentUserRoes = props.currentUser.roles.map((role) => ({
    //   value: role.name,
    //   label: RolesLabel[role.name],
    // }));
    // setUserRole(currentUserRoes);
    // setUserRole(easd);
  }, [props.currentUser]);

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
