import React, { Fragment, useState } from 'react';

import Spinner from '../../UI/Spinner';
import { createCommentRequest } from '../../api/comment-requests';
import { messages } from '../../data/constants';

const CommentForm = (props) => {
  const [spinnerShow, setSpinnerShow] = useState(false);
  const [content, setContent] = useState('');
  // const [file, setFile] = useState(null);
  // const [formData, setFormData] = useState(defaultCommentState);

  const onImageChange = (e) => {
    e.persist();
    // setFile(e.target.image.files[0]);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (content === '') {
      alert(messages.form.required);
      return;
    }

    const data = {
      ...props.commentState,
      content,
      // image: file,
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
                  name="content"
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
            </div>
            {/* <label className="flex gap-2">
              Comment Image:
              <input
                type="file"
                name="image"
                accept="image/png, image/gif, image/jpeg"
                id="image"
                onChange={onImageChange}
              />
            </label> */}
            <button
              className="float-right bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-500 ease-in-out duration-100"
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
