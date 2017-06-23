import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Header from '../components/Headers';
import Spinner from '../components/Spinner';
import Footer from '../components/Footer';
import MessageBar from '../components/MessageBar';
import {hideSuccessBar, hideErrorBar} from '../actionCreators/globalActions';

class AppLayout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { showSuccessBar, successMessage, showErrorBar, errorMessage, onSuccessBarDismiss, onErrorBarDismiss } = this.props;

    return (
      <MuiThemeProvider>
        <div>
          <MessageBar showBar={showSuccessBar}
                      message={successMessage}
                      onDismiss={onSuccessBarDismiss} />

          <MessageBar showBar={showErrorBar}
                      message={errorMessage}
                      type="error"
                      onDismiss={onErrorBarDismiss} />

          <Header />

          { this.props.children }

          <Spinner />

          <Footer />
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  showSuccessBar: state.global.showSuccessBar,
  successMessage: state.global.successBarMessage,
  showErrorBar: state.global.showErrorBar,
  errorMessage: state.global.errorBarMessage
});

const mapDispatchToProps = dispatch => ({
  onSuccessBarDismiss: bindActionCreators(hideSuccessBar, dispatch),
  onErrorBarDismiss: bindActionCreators(hideErrorBar, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AppLayout);
