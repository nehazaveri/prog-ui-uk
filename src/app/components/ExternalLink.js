import React from 'react';
import {FormattedMessage} from 'react-intl';

class ExternalLink extends React.Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick(event) {
        if (this.props.onClick) {
            this.props.onClick(event);
        }
    }

    render() {
        return (
            <a href={this.props.href} target={this.props.target || '_blank'} onClick={this.onClick}>
                <FormattedMessage id={this.props.messageId} defaultMessage={this.props.defaultMessage}/>
            </a>
        );
    }
}

export default ExternalLink;
