import React, { Fragment, useState } from 'react';

import Spinner from '../../UI/Spinner';
import storage from '../../firebaseConfig';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

import {
  createCommentRequest,
  storecommentImages,
} from '../../api/comment-requests';
import { messages } from '../../data/constants';

const CommentForm = (props) => {
  const [spinnerShow, setSpinnerShow] = useState(false);
  const [content, setContent] = useState('');
  const [files, setFiles] = useState([]);
  const [percent, setPercent] = useState(0);

  const onImageChange = (e) => {
    setFiles([...files, ...e.target.files]);
  };

  const handleImageUpload = (setSpinnerShow, response) => {
    if (files.length === 0) {
      alert('Please choose a file first!');
    }
    const promises = [];
    files.map((file) => {
      const storageRef = ref(storage, `/files/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      promises.push(uploadTask);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setPercent(percent);
        },
        (err) => console.log(err),
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
            storecommentImages(response.data.id, url);
            props.setExtractAgain(url);
          });
        }
      );
    });

    Promise.all(promises).then(() => {
      setSpinnerShow(false);
      props.setModalShow(false);
    });
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    if (content === '') {
      alert(messages.form.required);
      return;
    }

    setSpinnerShow(true);

    const data = { ...props.commentState, content };
    const response = await createCommentRequest(data);

    if (response.status === 201) {
      handleImageUpload(setSpinnerShow, response);
      setSpinnerShow(true);
    }
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
            <label className="flex gap-2">
              Comment Image:
              <input
                type="file"
                name="image"
                accept="image/*"
                id="image"
                multiple
                onChange={onImageChange}
              />
              <p>{`${percent} % done`}</p>
            </label>
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
