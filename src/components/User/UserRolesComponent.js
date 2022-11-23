import React from 'react';

const UserRolesComponent = (props) => {
  // const userCtx = useContext(UserContext)

  return (
    <div className="flex gap-2">
      <div className="flex gap-2">
        {props.user.roles.length === 0 ? (
          <span className="text-xs bg-gray-200 p-1 rounded-md">
            No Role Assigned Yet
          </span>
        ) : (
          props.user?.roles.map((role, index) => (
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
  );
};

export default UserRolesComponent;
