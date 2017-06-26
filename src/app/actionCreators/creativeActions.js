import {helperSortFunc, helperSortFuncInt} from '../utils';
import {constants} from '../utils/constants';
import {makeGetRequest, makePutRequest, checkAndGetResponse, makePostRequest} from '../utils/httpUtils';
import {showSpinner, hideSpinner, showSuccessBar, showErrorBarWithError} from './globalActions';

export const baseUrl = `${APP_CONSTANTS.ENDPOINTS.ACCOUNT_API_URL}/creative`;

export function uploadCreative(creativeTitle, advertiser, product, successCallback) {
  return function (dispatch) {
    dispatch(showSpinner());

    return makePostRequest({
      url: baseUrl,
      body: {
        creativeTitle,
        advertiser,
        product
      }
    }).
    then(checkAndGetResponse).
    then(response => {
      if (successCallback) {
        successCallback();
      }

      //return dispatch(fetchCreativeList());
    }).
    then(() => {
      dispatch(showSuccessBar(`Creative '${name}' uploaded successfully`));
    }).
    catch(err => {
      console.error("Failed to upload a new create!", err);

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
     dispatch(getOrganisationsSuccess(response));

     dispatch(hideSpinner());
   }).
   catch(err => {
     console.error('Oops! Something went wrong! There was a problem with getting organisation details from the server!', err);

     dispatch(hideSpinner());
     dispatch(showErrorBarWithError(`Organisations fetch failed!`, err));
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

