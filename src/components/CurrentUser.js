import React, { Fragment, useContext } from 'react';
import UserContext from '../store/user-context';
import UserRolesComponent from './User/UserRolesComponent';

const CurrentUser = (props) => {
  const userCtx = useContext(UserContext);
  const isUserLoggestIn = userCtx.authToken.length !== 0;

  return (
    <Fragment>
      {isUserLoggestIn !== 0 && (
        <div className="shadow-md p-3 rounded-md">
          <p className="">{isUserLoggestIn ? userCtx.user.email : ''}</p>
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
