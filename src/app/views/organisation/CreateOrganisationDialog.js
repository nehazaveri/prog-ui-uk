import {connect} from 'react-redux';
import React, {Component} from 'react';
import _ from 'lodash';
import Checkbox from 'material-ui/Checkbox';
import {createOrganisation} from '../../actionCreators/organisationActions';
import {bindActionCreators} from 'redux';

class CreateOrganisationDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      roles: [],
      saveButtonDisabled: true
    };

    this.createOrganisation = this.createOrganisation.bind(this);
    this.onRolesCheck = this.onRolesCheck.bind(this);
    this.validateFields = this.validateFields.bind(this);
  }

  createOrganisation() {
    let {organisationName, externalId} = this;

    this.props.createOrganisation(organisationName.value,
      externalId.value,
      this.state.roles,
      this.props.onCloseDialog);
  }

  onRolesCheck(roleName) {
    let newRoles;
    if (_.includes(this.state.roles, roleName)) {
      newRoles = this.state.roles.filter(role => role !== roleName);
    } else {
      newRoles = this.state.roles.concat([roleName]);
    }

    this.setState({ roles: newRoles });

    this.validateFields(newRoles);
  }

  validateFields(roles = this.state.roles) {
    let isInvalid = true;

    isInvalid = _.some([this.organisationName, this.externalId], inputElement => {
      return !inputElement.value || !inputElement.value.trim();
    });

    if (!isInvalid) {
      const externalIdValue = this.externalId.value.trim(),
        parsedIntegerId = Number.parseInt(externalIdValue);

      isInvalid = Number.isNaN(parsedIntegerId) || parsedIntegerId != externalIdValue;
    }

    if (!isInvalid) {
      isInvalid = _.isEmpty(roles);
    }

    this.setState({ saveButtonDisabled: isInvalid });
  }

  render() {

    return (
      <div id="orderSettings">
        <h2>Create Organisation</h2>
        <fieldset>
          <div className="inputWrap">
            <label htmlFor="organisationName">Organisation Name:</label>
            <input type="text"
                   className="ccText"
                   placeholder="Enter Organisation Name"
                   ref={input => {
                     this.organisationName = input;
                   }}
                   onChange={e => {this.validateFields();}}
                   required="true"
                   id="organisationName">
            </input>
          </div>
          <div className="inputWrap">
            <label htmlFor="externalId">External Reference ID:</label>
            <input className="ccText"
                   placeholder="Enter Numeric External ID"
                   ref={input => {
                     this.externalId = input;
                   }}
                   onChange={e => {this.validateFields();}}
                   required="true"
                   id="externalId">
            </input>
          </div>

          <div className="inputWrap checkbox">
            <label>Organisational Roles:</label>
            <div className="checkboxWrap">
              <Checkbox label="Business Unit"
                        className="ccCheckedNew"
                        iconStyle={{'fill': 'rgba(0,0,0,0.6)'}}
                        disabled={true}
                        onCheck={()=> this.onRolesCheck('publisher')} />
            </div>
            <div className="checkboxWrap">
              <Checkbox label="Buyer"
                        className="ccCheckedNew"
                        iconStyle={{'fill': 'rgba(0,0,0,0.6)'}}
                        onCheck={()=> this.onRolesCheck('buyer')} />
            </div>
            <div className="checkboxWrap">
              <Checkbox label="Advertiser"
                        className="ccCheckedNew"
                        iconStyle={{'fill': 'rgba(0,0,0,0.6)'}}
                        onCheck={() => this.onRolesCheck('advertiser')} />
            </div>
          </div>

          <div className="inputWrap buttonsWrapper">
            <button className="ctaOne save"
                    disabled={this.state.saveButtonDisabled}
                    onClick={this.createOrganisation}>
              Save
            </button>
            <button className="ctaTwo cancel"
                    onClick={this.props.onCloseDialog}>Cancel</button>
          </div>
        </fieldset>
      </div>);
  }


}

const mapDispatchToProps = dispatch => ({
  createOrganisation: bindActionCreators(createOrganisation, dispatch)
});

export default connect(null, mapDispatchToProps)(CreateOrganisationDialog);

