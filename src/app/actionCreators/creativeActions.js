import {helperSortFunc, helperSortFuncInt} from '../utils';
import {constants} from '../utils/constants';
import {makeGetRequest, makePutRequest, checkAndGetResponse, makePostRequest} from '../utils/httpUtils';
import {showSpinner, hideSpinner, showSuccessBar, showErrorBarWithError} from './globalActions';
import FormData from 'form-data';

export const baseUrl = `${APP_CONSTANTS.ENDPOINTS.ACCOUNT_API_URL}/creative`;

export function uploadCreative(creative, successCallback) {
  return function (dispatch) {
    dispatch(showSpinner());

    let formData = new FormData();
    formData.append('contentMetaData',creative.contentMetaData);
    formData.append('content',creative.content);

    return makePostRequest({
      url: baseUrl,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      body: formData
    }).
    then(checkAndGetResponse).
    then(response => {
      if (successCallback) {
        successCallback();
      }
      return dispatch(fetchCreativeList());
    }).
    then(() => {
      dispatch(showSuccessBar(`Creative '${creative.contentMetaData.title}' uploaded successfully`));
    }).
    catch(err => {
      console.error("Failed to upload a new creative!", err);

      dispatch(hideSpinner());

      dispatch(showErrorBarWithError(`Creative creation failed!`, err));
    });
  }
}

export function fetchCreativeList(){
 return function fetchCreativeList(dispatch){
   dispatch(showSpinner());

   return makeGetRequest({
     url: baseUrl
   }).
   then(checkAndGetResponse).
   then(response => {
     dispatch(getCreativesSuccess(response));

     dispatch(hideSpinner());
   }).
   catch(err => {
     console.error('Oops! Something went wrong! There was a problem with getting organisation details from the server!', err);

     dispatch(hideSpinner());
     dispatch(showErrorBarWithError(`Failed to fetch creatives!`, err));
    });
   }
}

export function getCreativesSuccess(creatives) {
 return {
   type: constants.GET_CREATIVES_SUCCESS,
   payload: {
     creatives
   }
 }
}

