import React from 'react';
import Crouton from 'react-crouton';
import {connect} from 'react-redux';

const DISPLAY_TIMEOUT = 5000;

export default class HeaderBar extends React.Component {

  constructor(props) {
    super(props);
  }

  render () {
    const { showBar, message, type = 'info', onDismiss } = this.props,
      data = {
      message,
      type,
      onDismiss,
      id: Date.now(),
      autoMiss: true,
      hidden: !showBar,
      timeout: DISPLAY_TIMEOUT
    };

    return (
      <Crouton
        id={data.id}
        message={data.message}
        type={data.type}
        timeout={data.timeout}
        hidden={data.hidden}
        autoMiss={data.autoMiss}
        onDismiss={data.onDismiss}
      />
    );
  }
}
