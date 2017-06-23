import React from 'react';
import {browserHistory} from 'react-router';
import { CREATIVE_PATH } from '../utils/constants';

class Error_NotFound extends React.Component {

  constructor() {
    super();

    this.returnHome = this.returnHome.bind(this);
  }

  returnHome() {
    browserHistory.push(CREATIVE_PATH);
  }

  render() {
    return (

      <main id="errors">
        <div id="topBar">
          <img src="images/logo-login@2x.png" width="140" height="17"/>
        </div>

        <div id="content">
          <h1>404 Not Found</h1>
          <p>Something’s missing… sorry about that.</p>
          <button className="ctaOne" onClick={this.returnHome}>Return Home</button>
        </div>
      </main>
    )
  };
}

export default Error_NotFound;
