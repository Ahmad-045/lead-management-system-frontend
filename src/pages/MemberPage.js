import React from 'react';
import Lead from '../components/Lead/Lead';
import Phase from '../components/Phase/Phase';
import PhaseEnginners from '../components/PhaseEnginners';
import { Route, Routes } from 'react-router-dom';
import UserList from '../components/User/UserList';
import NotFound from './NotFound';

const MemberPage = (props) => {
  return (
    <div className="p-1">
      <Routes>
        <Route
          path="/"
          element={
            <Lead authToken={props.authToken} currentUser={props.currentUser} />
          }
        />
        <Route
          path="lead/:id/phases"
          element={
            <Phase
              authToken={props.authToken}
              currentUser={props.currentUser}
            />
          }
        />
        <Route
          path="lead/:leadId/phases/:phaseId/engineers"
          element={<PhaseEnginners />}
        />
        <Route path="/users" element={<UserList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default MemberPage;
