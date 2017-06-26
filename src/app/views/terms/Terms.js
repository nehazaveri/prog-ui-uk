import React, {PropTypes} from 'react';

class Terms extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <main id="terms">
        <div id="topBar">
          <img src="images/logo-login@2x.png" width="140" height="17"/>
        </div>
        <div className="innerWrap">
          <h1>Terms</h1>
          <p><a href={APP_CONSTANTS.ENDPOINTS.AD_PLATFORM_URL} target="_blank">View Platform Terms & Conditions</a></p>
          <p><a href={APP_CONSTANTS.ENDPOINTS.SALES_TERMS_URL} target="_blank">View Sales Terms & Conditions</a></p>
        </div>
      </main>
    )
  };
}


export default Terms;
