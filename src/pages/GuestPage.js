import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';

const GuestPage = (props) => {
  const [newUser, setNewUser] = useState(false);

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold mt-4 ">Lead Management System</h1>
      {!newUser && (
        <LoginForm
          setUserHandler={props.setUserHandler}
          setSpinnerShow={props.setSpinnerShow}
          setNewUser={setNewUser}
        />
      )}
      {newUser && <SignUpForm setNewUser={setNewUser} />}
    </div>
  );
};

export default GuestPage;
