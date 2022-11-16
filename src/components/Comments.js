import React, { useState, useEffect } from 'react';

import ReactTimeAgo from 'react-time-ago';

import { extractCommentRequest } from '../api/comment-requests';

const Comments = (props) => {
  const [commentsList, setCommentsList] = useState([]);
  const [spinnerShow, setSpinnerShow] = useState(false);

  useEffect(() => {
    setSpinnerShow(false);
    extractCommentRequest(
      props.commentType,
      props.id,
      setCommentsList,
      setSpinnerShow
    );
  }, [props.id, props.commentType]);

  return (
    <div className="mt-4">
      <h1 className="text-lg font-medium">Comments </h1>
      <button
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
    </div>
  );
};

export default Comments;
