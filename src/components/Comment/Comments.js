import React, { useState, useEffect } from 'react';

import ReactTimeAgo from 'react-time-ago';
import Modal from '../../UI/Modal';

import { extractCommentRequest } from '../../api/comment-requests';
import CommentForm from './CommentForm';

const defaultCommentType = {
  commentable_id: '',
  commentable_type: '',
};

const Comments = (props) => {
  const [commentsList, setCommentsList] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [spinnerShow, setSpinnerShow] = useState(false);
  const [commentState, setCommentState] = useState(defaultCommentType);

  const setTypesToCreateComment = (id) => {
    setCommentState({
      commentable_id: id,
      commentable_type: props.commentType,
    });
    setModalShow(true);
  };

  useEffect(() => {
    setSpinnerShow(false);
    extractCommentRequest(
      props.commentType,
      props.id,
      setCommentsList,
      setSpinnerShow
    );
  }, [props.id, props.commentType, commentState]);

  return (
    <div className="mt-4">
      <h1 className="text-lg font-medium">Comments </h1>
      <button
        onClick={() => setTypesToCreateComment(props.id)}
        className="bg-blue-600 text-white font-medium px-2 py-1 rounded-md my-2"
        type="button"
      >
        Add New Comment
      </button>
      {spinnerShow && (
        <div className="mt-1">
          {commentsList.map((comment, index) => (
            <div
              key={comment + index}
              className="relative grid grid-cols-1 gap-4 p-4 my-2 border rounded-lg bg-white shadow-sm"
            >
              <div className="relative flex gap-4">
                <div className="flex flex-col w-full">
                  <div className="flex flex-row justify-between">
                    <p>
                      <strong>Created by: &nbsp; </strong>
                      {comment.user.email}
                    </p>
                    <div className="text-sm font-bold text-gray-500">
                      <ReactTimeAgo
                        date={new Date(comment.created_at)}
                        locale="en-US"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <p className="-mt-4 text-gray-500">{comment.content}</p>
            </div>
          ))}
        </div>
      )}
      {modalShow && (
        <Modal onhideDetails={() => setModalShow(false)}>
          <CommentForm
            setModalShow={setModalShow}
            commentState={commentState}
            setCommentsList={setCommentsList}
          />
        </Modal>
      )}
    </div>
  );
};

export default Comments;
