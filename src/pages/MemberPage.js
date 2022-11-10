import React from 'react';
import Lead from '../components/Lead/Lead';
import Phase from '../components/Phase/Phase';
import PhaseEnginners from '../components/PhaseEnginners';
import { Route, Routes } from 'react-router-dom';
import UserList from '../components/User/UserList';

const MemberPage = (props) => {
  return (
    <div className="p-10">
      <h1 className="text-lg underline font-bold mb-2">
        Details of Current User:
      </h1>
      <p className="ml-2">
        <strong>Email: </strong> {props.currentUser.email}
      </p>
      <hr className="my-2" />
      <Routes>
        <Route
          path="/"
          element={
            <Lead authToken={props.authToken} currentUser={props.currentUser} />
          }
        />
        <Route
          path="lead/:id/phases"
          element={<Phase authToken={props.authToken} />}
        />
        <Route
          path="lead/:leadId/phases/:phaseId/engineers"
          element={<PhaseEnginners />}
        />
        <Route path="/users" element={<UserList />} />
      </Routes>
    </div>
  );
};

export default MemberPage;
