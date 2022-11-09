import React from 'react';
import Lead from '../components/Lead/Lead';
import Phase from '../components/Phase/Phase';
import { Route, Routes } from 'react-router-dom';

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
        <Route path="lead/:id/phases" element={<Phase />} />
      </Routes>
    </div>
  );
};

export default MemberPage;
