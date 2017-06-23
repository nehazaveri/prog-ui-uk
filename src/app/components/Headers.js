import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { CREATIVE_PATH, TERMS_PATH, ABOUT_US_PATH, USER_HOME_PATH  } from '../utils/constants';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import ExternalLink from './ExternalLink';
//import * as loginActions from '../actionCreators/loginActions';
import classes from 'classnames';
import _ from 'lodash';

export class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullName : '',
      email : '',
      popoverMenuOpen : false,
      userMenuClasses : undefined
    };

//    this.logoutButtonHandler = this.logoutButtonHandler.bind(this);
    this.handleUserMenu = this.handleUserMenu.bind(this);
  }

//  logoutButtonHandler() {
//    this.props.logout();
//  }

  handleUserMenu() {
    let popoverState = !this.state.popoverMenuOpen;
    this.setState({
      popoverMenuOpen: popoverState,
      userMenuClasses: classes({
        active: popoverState
      })
    })
  }

  render() {
    const { props } = this,
        userPictureUrl = _.get(props, 'userData.picture', ''),
        firstName = _.get(props, 'userData.userResponse.firstName', ''),
        lastName = _.get(props, 'userData.userResponse.lastName', '');

    return (
      <div className='navWrapper'><nav>
        <Link to={CREATIVE_PATH} activeClassName="active">
          <div id="logo">
            <span></span>
          </div>
        </Link>
        <ul id="mainNavigation">
          <li>
            <Link to={CREATIVE_PATH} activeClassName="active">
              <FormattedMessage id="app.organisation" defaultMessage="Organisation"/>
            </Link>
          </li>
        </ul>

        <span id="userNav" onClick={this.handleUserMenu}>
          <div id="welcomeMessage">Hello, <span>{`${firstName} ${lastName}`}</span></div>
          <img src={ userPictureUrl } width="32" height="32"/>
        </span>

        <ul id="userMenu" className={this.state.userMenuClasses}>
          <li>
            <ExternalLink href={ ABOUT_US_PATH }
                          messageId="app.aboutUs"
                          defaultMessage="About Us"
                          target="aboutUs"
                          onClick={this.handleUserMenu} />
          </li>
          <li>
            <ExternalLink href={ TERMS_PATH }
                          messageId="app.terms"
                          defaultMessage="Terms"
                          target="terms"
                          onClick={this.handleUserMenu} />
          </li>
          <li><a className="logout" onClick={this.logoutButtonHandler}>Sign Out</a></li>
        </ul>
      </nav>
      </div>
    );
  }
}

//const mapStateToProps = (state) => ({
//  isAuthenticated: state.auth.isAuthenticating,
//  userData: state.auth.userData
//});
//
//const mapDispatchToProps = (dispatch) => ({
//  logout: bindActionCreators(loginActions.logout, dispatch)
//});

