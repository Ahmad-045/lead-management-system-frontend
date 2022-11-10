import React from 'react';

const UserRoles = (props) => {
  return (
    <div>
      <h1 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
        Current User Roles
      </h1>
      {props.currentUser && (
        <ul className="space-y-1 max-w-md list-disc list-inside text-gray-500 dark:text-gray-400">
          {props.currentUser.roles.map((role) => {
            return <li key={role.id + role.name}>{role.name}</li>;
          })}
        </ul>
      )}
    </div>
  );
};

export default UserRoles;