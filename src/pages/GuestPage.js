import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';

const GuestPage = (props) => {
  const [newUser, setNewUser] = useState(false);

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold mt-4 ">Lead Management System</h1>
      <LoginForm setUserHandler={props.setUserHandler} />
      <button
        onClick={() => setNewUser(true)}
        className="bg-blue-600 text-white px-3 py-1 rounded-md font-medium"
      >
        New User
      </button>
      {newUser && <SignUpForm setNewUser={setNewUser} />}
    </div>
  );
};

export default GuestPage;
