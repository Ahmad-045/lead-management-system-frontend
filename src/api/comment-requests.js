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
      setSpinnerShow(true);
    })
    .catch((eror) => {
      console.log(eror);
      setSpinnerShow(true);
    });
};
