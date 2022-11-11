import React, { useState } from 'react';

const defaultFormState = {
  username: '',
  email: '',
  password: '',
  password_confirmation: '',
  contact: '',
};

const SignUpForm = () => {
  const [formData, setFormData] = useState(defaultFormState);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const isEmpty = Object.values(formData).every((x) => x !== '');

    if (!isEmpty) {
      alert('Fill in all the required Fields...');
      return;
    }

    if (formData.password !== formData.password_confirmation) {
      alert('Password and password confimation are not matched');
      return;
    }

    if (formData.password.length < 6) {
      alert('Password not match the minimum length criteria');
      return;
    }
  };

  const inputFieldChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex justify-center items-center">
      <div className="p-5 text-left">
        <h1 className="mb-4 font-medium text-xl underline">sign Up Form</h1>
        <form className="w-full w-96" onSubmit={formSubmitHandler}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Username
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-password"
                type="text"
                name="username"
                onChange={inputFieldChangeHandler}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Email
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-password"
                type="email"
                name="email"
                onChange={inputFieldChangeHandler}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Password
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-password"
                type="password"
                name="password"
                onChange={inputFieldChangeHandler}
              />
              <p className="text-gray-600 text-xs italic">
                Password Must be 6 digits or more !
              </p>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Password Confirmation
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-password"
                type="password"
                name="password_confirmation"
                onChange={inputFieldChangeHandler}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Contact No.
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-password"
                type="text"
                name="contact"
                onChange={inputFieldChangeHandler}
              />
            </div>
          </div>
          <button
            className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-500 ease-in-out duration-100"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
