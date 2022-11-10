import React, { useEffect, useState } from 'react';
import { extractUsersFromApi } from '../../api/api-requests';
import Modal from '../../UI/Modal';
import UserRoles from './UserRoles';
import UserRoleForm from './UserRoleForm';

const UserList = () => {
  const [usersList, setUsersList] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const showUserRoles = (user) => {
    setCurrentUser(user);
    setModalShow(true);
  };

  const showFormForRole = () => {
    setCurrentUser(null);
    setModalShow(true);
  };

  useEffect(() => {
    extractUsersFromApi(setUsersList);
  }, []);

  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-10">
      <table>
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6">
              Sr No.
            </th>
            <th scope="col" className="py-3 px-6">
              Email
            </th>
            <th scope="col" colSpan={2} className="py-3 px-6">
              Roles
            </th>
          </tr>
        </thead>
        <tbody>
          {usersList?.map((user) => (
            <tr
              key={user.id + user}
              className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
            >
              <th className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {user.id}
              </th>
              <td className="py-4 px-6">{user.email}</td>
              <td className="py-4 px-6">
                <button
                  onClick={() => showUserRoles(user)}
                  className="border-2 border-blue-600 py-1 px-3 rounded-xl ease-in-out duration-200 hover:text-white hover:bg-blue-600"
                >
                  Assigned Roles
                </button>
              </td>
              <td className="py-4 px-6">
                <button
                  onClick={() => showFormForRole(user)}
                  className="border-2 border-blue-600 py-1 px-3 rounded-xl ease-in-out duration-200 hover:text-white hover:bg-blue-600"
                >
                  New Role
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {modalShow && (
        <Modal onhideDetails={() => setModalShow(false)}>
          {currentUser && <UserRoles currentUser={currentUser} />}
          {!currentUser && <UserRoleForm setModalShow={setModalShow} />}
        </Modal>
      )}
    </div>
  );
};

export default UserList;
