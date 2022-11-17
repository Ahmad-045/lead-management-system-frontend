import axios from 'axios';
import { setauthToken, checkUnauthoriztionaStatus } from './helper-functions';
import { BASE_URL, messages } from '../data/constants';

export const extractCommentRequest = (
  commentTypeForUrl,
  leadId,
  setCommentsList,
  setSpinnerShow
) => {
  setauthToken();
  let commentTypeControllerName = commentTypeForUrl.replaceAll('/', '');

  axios
    .get(
      `${BASE_URL}${commentTypeForUrl}${leadId}/comments?commentable_type=${commentTypeControllerName}`
    )
    .then((res) => {
      setCommentsList(res.data);
      setSpinnerShow(false);
    })
    .catch((error) => {
      console.log(error);
      setSpinnerShow(false);
    });
};

export const createCommentRequest = (
  commentState,
  setCommentsList,
  setSpinnerShow,
  setModalShow
) => {
  console.log(commentState);
  setauthToken();
  const commentTypeForUrl = commentState.commentable_type;
  commentState.commentable_type = commentState.commentable_type.replaceAll(
    '/',
    ''
  );

  commentState.commentable_id = parseInt(commentState.commentable_id);
  axios
    .post(
      `${BASE_URL}${commentTypeForUrl}${commentState.commentable_id}/comments`,
      { data: commentState }
    )
    .then((res) => {
      extractCommentRequest(
        commentTypeForUrl,
        commentState.commentable_id,
        setCommentsList,
        setSpinnerShow
      );
      console.log(res);
      setSpinnerShow(false);
      setModalShow(false);
    })
    .catch((error) => {
      setSpinnerShow(false);
      console.log(error);
      setModalShow(false);
    });
};
