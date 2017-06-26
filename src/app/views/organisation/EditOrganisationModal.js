import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import Checkbox from 'material-ui/Checkbox';
import {ORGANISATION_ROLES} from '../../utils/constants';
import {updateOrganisation} from '../../actionCreators/organisationActions';
import {bindActionCreators} from 'redux';

class EditOrganisationModal extends Component {
  constructor(props) {
    super(props);

    this.originalRoles = props.organisation.rolePlayingOrganisations.map(o => o.role.toLowerCase());

    this.state = {
      roles: _.cloneDeep(this.originalRoles),
      saveButtonDisabled: true
    };

    this.onUpdate = this.onUpdate.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.onRolesCheck = this.onRolesCheck.bind(this);
    this.validateFields = this.validateFields.bind(this);
  }

  onUpdate() {
    this.props.updateOrganisation({
      id: this.props.organisation.id,
      name: this.organisationName.value,
      externalId: this.externalId.value,
      roles: this.state.roles
    }, () => {
      this.onCloseModal();
    });
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
    const {name, externalId, rolePlayingOrganisations} = this.props.organisation;

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

    if (!isInvalid && this.organisationName.value === name && this.externalId.value === externalId && _.isEqual(this.originalRoles, roles)) {
      isInvalid = true;
    }

    this.setState({ saveButtonDisabled: isInvalid });
  }

  onCloseModal() {
    const {onCloseModal} = this.props;

    if (onCloseModal) {
      onCloseModal();
    }
  }

  render() {
    const {name, externalId, rolePlayingOrganisations} = this.props.organisation;

    return (
      <section id="overlayEditOrganisation" className="active">
          <div className="modal">
             <div>
                  <h2>Edit Organisation</h2>
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
                             defaultValue={name}
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
                             defaultValue={externalId}
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
                                  defaultChecked={_.includes(this.originalRoles, 'publisher')}
                                  onCheck={()=> this.onRolesCheck('publisher')} />
                      </div>
                      <div className="checkboxWrap">
                        <Checkbox label="Buyer"
                                  className="ccCheckedNew"
                                  iconStyle={{'fill': 'rgba(0,0,0,0.6)'}}
                                  disabled={_.includes(this.originalRoles, 'buyer')}
                                  defaultChecked={_.includes(this.originalRoles, 'buyer')}
                                  onCheck={()=> this.onRolesCheck('buyer')} />
                      </div>
                      <div className="checkboxWrap">
                        <Checkbox label="Advertiser"
                                  className="ccCheckedNew"
                                  iconStyle={{'fill': 'rgba(0,0,0,0.6)'}}
                                  disabled={_.includes(this.originalRoles, 'advertiser')}
                                  defaultChecked={_.includes(this.originalRoles, 'advertiser')}
                                  onCheck={() => this.onRolesCheck('advertiser')} />
                      </div>
                    </div>

                    <div className="inputWrap buttonsWrapper">
                      <button onClick={this.onUpdate}
                              disabled={this.state.saveButtonDisabled}
                              className="ctaOne save">
                          Update
                      </button>
                      <button onClick={this.onCloseModal}
                              className="ctaTwo cancel">
                        Cancel
                      </button>
                    </div>
                  </fieldset>
              </div>
          </div>
      </section>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateOrganisation: bindActionCreators(updateOrganisation, dispatch)
});

export default connect(null, mapDispatchToProps)(EditOrganisationModal);

