import React from 'react';
import ExternalLink from './ExternalLink';
import { TERMS_PATH, ABOUT_US_PATH } from '../utils/constants';

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <nav id="footerNav">
      <ul>
        <li>
          <ExternalLink href={ ABOUT_US_PATH }
                        messageId="app.aboutUs"
                        defaultMessage="About Us"
                        target="aboutUs"/>
        </li>
        <li>
          <ExternalLink href={ TERMS_PATH }
                        messageId="app.terms"
                        defaultMessage="Terms"
                        target="terms"/>
        </li>
      </ul>
    </nav>
    )
  }
}

