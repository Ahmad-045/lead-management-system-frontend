import React from 'react';
import LoginForm from '../components/LoginForm';

const GuestPage = (props) => {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold mt-4 ">Lead Management System</h1>
      <LoginForm setUserHandler={props.setUserHandler} />
    </div>
  );
};

export default GuestPage;
