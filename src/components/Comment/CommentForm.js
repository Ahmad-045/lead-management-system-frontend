import React, { Fragment, useState } from 'react';

import Spinner from '../../UI/Spinner';
import { createCommentRequest } from '../../api/comment-requests';

const CommentForm = (props) => {
  const [content, setContent] = useState('');
  const [spinnerShow, setSpinnerShow] = useState(false);

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (content === '') {
      alert('Comment Body is empty');
      return;
    }

    const data = {
      ...props.commentState,
      content,
    };
    setSpinnerShow(true);
    createCommentRequest(
      data,
      props.setCommentsList,
      setSpinnerShow,
      props.setModalShow
    );
  };
  return (
    <div>
      {spinnerShow ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="mb-4 font-medium text-xl underline">
            Create New Comment
          </h1>
          <form className="w-full max-w-xl" onSubmit={formSubmitHandler}>
            <div className="flex w-full mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Comment Form
                </label>
                <textarea
                  required={true}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-password"
                  type="email"
                  name="client_email"
                  onChange={(e) => setContent(e.target.value)}
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
        </Fragment>
      )}
    </div>
  );
};

export default CommentForm;
