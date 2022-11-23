import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';

import Lead from '../components/Lead/Lead';
import NotFound from './NotFound';
import Phase from '../components/Phase/Phase';
import PhaseEnginners from '../components/PhaseEnginners';
import UserList from '../components/User/UserList';

const MemberPage = (props) => {
  return (
    <div className="p-1">
      <Routes>
        <Route path="/lead" element={<Lead />} />
        <Route path="lead/:id/phases" element={<Phase />} />
        <Route
          path="lead/:leadId/phases/:phaseId/engineers"
          element={<PhaseEnginners />}
        />
        <Route
          path="/users"
          element={<UserList currentUser={props.currentUser} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default MemberPage;
