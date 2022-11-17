import React, { Fragment } from 'react';
import UserRolesComponent from './User/UserRolesComponent';

const CurrentUser = (props) => {
  return (
    <Fragment>
      {props.loggedIn && (
        <div className="shadow-md p-3 rounded-md">
          <p className="">{props.loggedIn ? props.currentUser.email : ''}</p>
          <div className="flex gap-2 mt-2">
            <strong className="text-sm">Roles: </strong>
            <UserRolesComponent user={props.currentUser} />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default CurrentUser;
