import React, {Component} from 'react';
import {Link} from 'react-router';
import {CREATIVE_PATH} from '../utils/constants';

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav id="organisationSideNav">
        <ul>
          <li className="active">
            <Link to={ CREATIVE_PATH }>Manage Creative</Link>
          </li>
        </ul>
      </nav>
    );
  }
}
