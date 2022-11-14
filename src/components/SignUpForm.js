import React, { Fragment, useState } from 'react';
import { registerNewUserApiRequest } from '../api/api-requests';
import InputMask from 'react-input-mask';
import Spinner from '../UI/Spinner';

const defaultFormState = {
  username: '',
  email: '',
  password: '',
  password_confirmation: '',
  contact: '',
};

const SignUpForm = (props) => {
  const [formData, setFormData] = useState(defaultFormState);
  const [errors, setErrors] = useState([]);
  const [spinnerShow, setSpinnerShow] = useState(false);

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

    var pattern = new RegExp(
      /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
    );
    if (!pattern.test(formData.contact) || formData.contact.length !== 12) {
      alert('Please enter valid phone number.');
      return;
    }

    registerNewUserApiRequest(
      formData,
      setErrors,
      props.setNewUser,
      setSpinnerShow
    );
  };

  const inputFieldChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="">
      <div className="flex justify-center items-center flex-col">
        {errors.length !== 0 && (
          <div className="text-red-800 shadow-md inline-block px-5 py-3">
            {Object.keys(errors).map((errorKey, index) => (
              <p key={errorKey + index}>
                {errorKey} {errors[errorKey]}
              </p>
            ))}
          </div>
        )}

        <div className="p-5 text-left">
          {spinnerShow ? (
            <Spinner />
          ) : (
            <Fragment>
              <h1 className="mb-4 font-medium text-xl underline">
                sign Up Form
              </h1>
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
                    <InputMask
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      mask="9999-9999999"
                      name="contact"
                      onChange={inputFieldChangeHandler}
                      value={formData.contact}
                    />
                    <p className="text-gray-600 text-xs italic">
                      Format (11 digits)-&gt; XXXX-XXXXXXX
                    </p>
                  </div>
                </div>
                <div className="flex justify-between">
                  <button
                    className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-500 ease-in-out duration-100"
                    type="submit"
                  >
                    Sign Up
                  </button>
                  <button
                    onClick={() => props.setNewUser(false)}
                    className="text-blue-600 underline"
                    type="button"
                  >
                    Log In
                  </button>
                </div>
              </form>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
