import axios from 'axios';
import { setauthToken } from './helper-functions';
import { BASE_URL } from '../data/constants';

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

export const createCommentRequest = async (commentState) => {
  setauthToken();
  const commentTypeForUrl = commentState.commentable_type;
  commentState.commentable_type = commentState.commentable_type.replaceAll(
    '/',
    ''
  );

  commentState.commentable_id = parseInt(commentState.commentable_id);
  const res = await axios.post(
    `${BASE_URL}${commentTypeForUrl}${commentState.commentable_id}/comments`,
    { data: commentState }
  );
  return res;
};

export const storecommentImages = async (commentId, url) => {
  let data = {
    comment_id: commentId,
    image_url: url,
  };

  const res = await axios.post(`${BASE_URL}/comments/${commentId}/images`, {
    image: data,
  });
  return res;
};
