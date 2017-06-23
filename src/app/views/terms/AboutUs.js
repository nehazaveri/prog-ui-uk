import React, {PropTypes} from 'react';

class AboutUs extends React.Component {

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
          <h1>About Us</h1>
          <address>
            Clear Channel Belgium SPRL<br />
            Laurent-Benoit Dewezplein<br />
            5B-1800 Vilvo(o)rde<br/>
            Belgium
          </address>
          <ul>
            <li>+32 (0)2 641 73 00</li>
            <li>info@clearchannel.be</li>
          </ul>
          <ul>
            <li>Company number: BE 412 432 122</li>
            <li>VAT number: B.T.W./T.V.A.: BE 0412 432 122</li>
            <li>Bank account: ING: IBAN BE80 3100 1932 1577</li>
          </ul>
        </div>
      </main>
    )
  };
}

export default AboutUs;
