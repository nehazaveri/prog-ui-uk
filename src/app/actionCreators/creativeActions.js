import {helperSortFunc, helperSortFuncInt} from '../utils';
import {constants} from '../utils/constants';
import {makeGetRequest, makePutRequest, checkAndGetResponse, makePostRequest} from '../utils/httpUtils';
import {showSpinner, hideSpinner, showSuccessBar, showErrorBarWithError} from './globalActions';

export const baseUrl = `${APP_CONSTANTS.ENDPOINTS.ACCOUNT_API_URL}/creative`;

export function uploadCreative(name, externalId, roles, successCallback) {

  return function (dispatch) {
    dispatch(showSpinner());

    return makePostRequest({
      url: baseUrl,
      body: {
        name,
        externalId,
        roles
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