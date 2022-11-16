import React, { Fragment } from 'react';

const CurrentUser = (props) => {
  return (
    <Fragment>
      {props.loggedIn && (
        <div className="shadow-md p-3 rounded-md">
          <p className="">{props.loggedIn ? props.currentUser.email : ''}</p>
          <div className="flex gap-2 mt-2">
            <strong className="text-sm">Roles: </strong>
            <div className="flex gap-2">
              {props.currentUser.roles.length === 0 ? (
                <span className="text-xs bg-gray-200 p-1 rounded-md">
                  No Role Assigned Yet
                </span>
              ) : (
                props.currentUser?.roles.map((role, index) => (
                  <p
                    key={role + index}
                    className="text-xs bg-gray-200 p-1 rounded-md"
                  >
                    {role.name}
                  </p>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default CurrentUser;
