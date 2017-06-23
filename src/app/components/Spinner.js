import React, {Component} from 'react';
import {connect} from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';

class Spinner extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let markup = <div></div>;

    if (this.props.showSpinner) {
      markup = (
        <div id="spinnerWrapper">
          <CircularProgress size={60} thickness={7} />
        </div>
      );
    }
    return markup;
  }
}

const mapStateToProps = state => ({
  showSpinner: state.global.showSpinner
});

export default connect(mapStateToProps)(Spinner);
